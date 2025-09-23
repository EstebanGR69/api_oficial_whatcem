"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_oficial_service_1 = require("../whatsapp-oficial/whatsapp-oficial.service");
const app_error_1 = require("../../../@core/infra/errors/app.error");
const RedisService_service_1 = require("../../../@core/infra/redis/RedisService.service");
const RabbitMq_service_1 = require("../../../@core/infra/rabbitmq/RabbitMq.service");
const socket_service_1 = require("../../../@core/infra/socket/socket.service");
const meta_service_1 = require("../../../@core/infra/meta/meta.service");
let WebhookService = WebhookService_1 = class WebhookService {
    constructor(rabbit, whatsAppService, redis, socket, meta) {
        this.rabbit = rabbit;
        this.whatsAppService = whatsAppService;
        this.redis = redis;
        this.socket = socket;
        this.meta = meta;
        this.logger = new common_1.Logger(`${WebhookService_1.name}`);
        this.messagesPermitidas = [
            'text',
            'image',
            'audio',
            'document',
            'video',
            'location',
            'contacts',
            'order',
            'interactive',
            'referral',
            'sticker',
        ];
    }
    async forwardToWebhook(whats, body) {
        try {
            const { n8n_webhook_url, auth_token_n8n, chatwoot_webhook_url, auth_token_chatwoot, typebot_webhook_url, auth_token_typebot, crm_webhook_url, auth_token_crm, } = whats;
            try {
                if (!!n8n_webhook_url) {
                    this.sendToWebhook(n8n_webhook_url, auth_token_n8n, body);
                }
                if (!!chatwoot_webhook_url) {
                    this.sendToWebhook(chatwoot_webhook_url, auth_token_chatwoot, body);
                }
                if (!!typebot_webhook_url) {
                    this.sendToWebhook(typebot_webhook_url, auth_token_typebot, body);
                }
                if (!!crm_webhook_url) {
                    this.sendToWebhook(crm_webhook_url, auth_token_crm, body);
                }
            }
            catch (error) {
                this.logger.error(`forwardToWebhook - Erro ao enviar webhook - ${error.message}`);
                throw new app_error_1.AppError(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.error(`forwardToWebhook - Erro nos webhook - ${error.message}`);
            throw new app_error_1.AppError(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sendToWebhook(webhook_url, token, body) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch(webhook_url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            this.logger.log('Resposta do encaminhamento do webhook', {
                webhook_url,
                responseData,
            });
        }
        catch (error) {
            this.logger.error('Erro ao encaminhar para o webhook', {
                erro: error.message,
                webhook_url,
            });
            return null;
        }
    }
    async webhookCompanyConexao(companyId, conexaoId, data) {
        try {
            const company = await this.whatsAppService.prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!company)
                throw new Error('Empresa não encontrada');
            const whats = await this.whatsAppService.prisma.whatsappOficial.findFirst({
                where: { id: conexaoId, companyId, deleted_at: null },
                include: { company: true },
            });
            if (!whats)
                throw new Error('Configuração não encontrada');
            const body = data?.body || data;
            if (body.object == 'whatsapp_business_account') {
                const { entry } = body;
                for (const e of entry) {
                    for (const change of e.changes) {
                        if (change.field == 'messages') {
                            const { value } = change;
                            if (value?.statuses != null) {
                                this.logger.log('Webhook recebido:', { body, companyId });
                                for (const status of value.statuses) {
                                    this.socket.readMessage({
                                        companyId: company.idEmpresaMult100,
                                        messageId: status.id,
                                        token: whats.token_mult100,
                                    });
                                }
                            }
                            else {
                                const contact = value.contacts[0];
                                for (const message of value.messages) {
                                    if (this.messagesPermitidas.some((m) => m == message.type)) {
                                        this.logger.log('Webhook recebido:', { body, companyId });
                                        if (!!whats.use_rabbitmq) {
                                            const exchange = companyId;
                                            const queue = `${whats.phone_number}`.replace('+', '');
                                            const routingKey = whats.rabbitmq_routing_key;
                                            await this.rabbit.sendToRabbitMQ(whats, body);
                                            this.logger.log(`Enviado para o RabbitMQ com sucesso. Vinculando fila '${queue}' à exchange '${exchange}' ${!!routingKey ? `com routing key '${routingKey}` : ''} '...`);
                                        }
                                        const messages = await this.redis.get(`messages:${companyId}:${conexaoId}`);
                                        if (!!messages) {
                                            const messagesStored = JSON.parse(messages);
                                            messagesStored.push(body);
                                            await this.redis.set(`messages:${companyId}:${conexaoId}`, JSON.stringify([messagesStored]));
                                        }
                                        else {
                                            await this.redis.set(`messages:${companyId}:${conexaoId}`, JSON.stringify([body]));
                                        }
                                        this.logger.log('Enviando mensagem para o servidor do websocket');
                                        let file;
                                        let idFile;
                                        let bodyMessage;
                                        let quoteMessageId;
                                        switch (message.type) {
                                            case 'video':
                                                idFile = message.video.id;
                                                file = await this.meta.downloadFileMeta(idFile, change.value.metadata.phone_number_id, whats.send_token, company.id, whats.id);
                                                break;
                                            case 'document':
                                                idFile = message.document.id;
                                                file = await this.meta.downloadFileMeta(idFile, change.value.metadata.phone_number_id, whats.send_token, company.id, whats.id);
                                                break;
                                            case 'image':
                                                idFile = message.image.id;
                                                file = await this.meta.downloadFileMeta(idFile, change.value.metadata.phone_number_id, whats.send_token, company.id, whats.id);
                                                break;
                                            case 'audio':
                                                idFile = message.audio.id;
                                                file = await this.meta.downloadFileMeta(idFile, change.value.metadata.phone_number_id, whats.send_token, company.id, whats.id);
                                                break;
                                            case 'interactive':
                                                file = null;
                                                bodyMessage =
                                                    message.interactive.button_reply?.id ||
                                                        message.interactive.list_reply?.id;
                                                break;
                                            case 'location':
                                                bodyMessage = JSON.stringify(message.location);
                                                break;
                                            case 'contacts':
                                                bodyMessage = {
                                                    contacts: message.contacts,
                                                };
                                                break;
                                            case 'sticker':
                                                idFile = message.sticker.id;
                                                file = await this.meta.downloadFileMeta(idFile, change.value.metadata.phone_number_id, whats.send_token, company.id, whats.id);
                                                break;
                                            case 'order':
                                                bodyMessage = JSON.stringify(message.order);
                                                break;
                                            default:
                                                file = null;
                                                bodyMessage = message.text.body;
                                                quoteMessageId = message.context?.id;
                                                break;
                                        }
                                        const msg = {
                                            timestamp: +message.timestamp,
                                            type: message.type,
                                            text: bodyMessage,
                                            file: !!file ? file.base64 : null,
                                            mimeType: !!file ? file.mimeType : null,
                                            idFile,
                                            idMessage: message.id,
                                            quoteMessageId,
                                        };
                                        const data = {
                                            companyId: company.idEmpresaMult100,
                                            nameContact: contact.profile.name,
                                            message: msg,
                                            token: whats.token_mult100,
                                            fromNumber: message.from,
                                        };
                                        this.socket.sendMessage(data);
                                        await this.forwardToWebhook(whats, body);
                                        this.logger.log('Enviado para o Webhook com sucesso.');
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            }
            else {
                this.logger.error(`Evento não tratado: ${JSON.stringify(body)}`);
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Erro no POST /webhook/:companyId/:conexaoId - ${error.message}`);
            throw new app_error_1.AppError(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async webhookCompany(companyId, conexaoId, mode, verify_token, challenge) {
        try {
            const whats = await this.whatsAppService.prisma.whatsappOficial.findFirst({ where: { id: conexaoId, companyId, deleted_at: null } });
            if (!whats)
                throw new Error('Configuração não encontrada');
            if (mode === 'subscribe' && verify_token === whats.token_mult100) {
                this.logger.log('WEBHOOK VERIFICADO para a empresa:', companyId);
                return challenge;
            }
            else {
                this.logger.error('Falha na verificação do webhook para a empresa:', companyId);
                throw new Error(`Falha na verificação do webhook para a empresa: ${companyId}`);
            }
        }
        catch (error) {
            this.logger.error(`webhookCompany - ${error.message}`);
            throw new app_error_1.AppError(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = WebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [RabbitMq_service_1.RabbitMQService,
        whatsapp_oficial_service_1.WhatsappOficialService,
        RedisService_service_1.RedisService,
        socket_service_1.SocketService,
        meta_service_1.MetaService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map