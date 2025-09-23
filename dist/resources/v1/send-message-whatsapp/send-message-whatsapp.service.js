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
var SendMessageWhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageWhatsappService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../@core/base/base.service");
const app_error_1 = require("../../../@core/infra/errors/app.error");
const files_utils_1 = require("../../../@core/common/utils/files.utils");
const meta_service_1 = require("../../../@core/infra/meta/meta.service");
const whatsapp_oficial_service_1 = require("../whatsapp-oficial/whatsapp-oficial.service");
let SendMessageWhatsappService = SendMessageWhatsappService_1 = class SendMessageWhatsappService extends base_service_1.BaseService {
    constructor(metaService, whatsAppService) {
        super('sendMessageWhatsApp', SendMessageWhatsappService_1.name);
        this.metaService = metaService;
        this.whatsAppService = whatsAppService;
    }
    async createFile(file, fileName, empresaId, conexaoId) {
        try {
            const data = new Date();
            const year = data.getFullYear();
            let month = String(data.getMonth() + 1);
            month = month.length == 1 ? `0${month}` : month;
            const day = data.getDate();
            let path = `${year}-${month}-${day}`;
            (0, files_utils_1.checkPasteFiles)(path);
            path += `/${empresaId}`;
            (0, files_utils_1.checkPasteFiles)(path);
            path += `/${conexaoId}`;
            (0, files_utils_1.checkPasteFiles)(path);
            return await (0, files_utils_1.savedFile)(file, path, fileName);
        }
        catch (error) {
            this.logger.error(`createMessage - ${error.message}`);
            throw new Error(`Falha ao salvar o arquivo`);
        }
    }
    async getIdMetaMedia(whatsId, phone_number_id, token, idCompany, file, fileName) {
        try {
            if (!file)
                throw new Error('Necessário informar um arquivo');
            const pathFile = await this.createFile(file, fileName, idCompany, whatsId);
            const metaFile = await this.metaService.sendFileToMeta(phone_number_id, token, pathFile);
            return { pathFile, mediaMetaId: metaFile.id };
        }
        catch (error) {
            this.logger.error(`getIdMetaMedia - ${error.message}`);
            throw new Error(error.message);
        }
    }
    async createMessage(token, dados_mensagem, file) {
        try {
            const data = JSON.parse(dados_mensagem);
            const regex = /^\+55\d{2}\d{8,9}$/;
            if (!data.to)
                throw new Error('Necessário informar o número do destinatario');
            if (!regex.test(data.to))
                throw new Error('o número não está no padrão do whatsapp');
            const whats = await this.prisma.whatsappOficial.findFirst({
                where: { token_mult100: token },
            });
            if (!whats)
                throw new Error('Conexão não encontrada');
            const company = await this.prisma.company.findFirst({
                where: { id: whats.companyId },
            });
            if (!company)
                throw new Error('Nenhuma empresa cadastrada para este usuário');
            const entity = {
                type: data.type,
                whatsappOficialId: whats.id,
                to: data.to,
            };
            const { body_text, body_video, body_document, body_image, body_location, body_reaction, body_contacts, body_interactive, body_sticket, body_template, } = data;
            let resMedia;
            let dataMessage;
            switch (data.type) {
                case 'text':
                    if (!body_text.body)
                        throw new Error('Necessário informar um texto para enviar a mensagem');
                    entity.text = {
                        body: body_text.body,
                        preview_url: body_text?.preview_url,
                    };
                    dataMessage = body_text;
                    break;
                case 'audio':
                    resMedia = await this.getIdMetaMedia(whats.id, whats.phone_number_id, whats.send_token, company.id, file, data.fileName);
                    if (!resMedia)
                        throw new Error('Erro ao gravar a mensagem');
                    entity.idFileMeta = resMedia.mediaMetaId;
                    entity.pathFile = resMedia.pathFile;
                    entity.audio = { id: resMedia.mediaMetaId };
                    dataMessage = { id: resMedia.mediaMetaId };
                    break;
                case 'video':
                    resMedia = await this.getIdMetaMedia(whats.id, whats.phone_number_id, whats.send_token, company.id, file, data.fileName);
                    if (!resMedia)
                        throw new Error('Erro ao gravar a mensagem');
                    entity.idFileMeta = resMedia.mediaMetaId;
                    entity.pathFile = resMedia.pathFile;
                    entity.video = {
                        id: resMedia.mediaMetaId,
                        caption: !!body_video?.caption ? body_video.caption : null,
                    };
                    dataMessage = {
                        id: resMedia.mediaMetaId,
                        caption: !!body_video?.caption ? body_video.caption : null,
                    };
                    break;
                case 'document':
                    resMedia = await this.getIdMetaMedia(whats.id, whats.phone_number_id, whats.send_token, company.id, file, data.fileName);
                    if (!resMedia)
                        throw new Error('Erro ao gravar a mensagem');
                    entity.idFileMeta = resMedia.mediaMetaId;
                    entity.pathFile = resMedia.pathFile;
                    entity.document = {
                        filename: resMedia.pathFile,
                        id: resMedia.mediaMetaId,
                        caption: !!body_document.caption ? body_document.caption : null,
                    };
                    dataMessage = {
                        filename: resMedia.pathFile,
                        id: resMedia.mediaMetaId,
                        caption: !!body_document.caption ? body_document.caption : null,
                    };
                    break;
                case 'image':
                    resMedia = await this.getIdMetaMedia(whats.id, whats.phone_number_id, whats.send_token, company.id, file, data.fileName);
                    if (!resMedia)
                        throw new Error('Erro ao gravar a mensagem');
                    entity.idFileMeta = resMedia.mediaMetaId;
                    entity.pathFile = resMedia.pathFile;
                    entity.image = {
                        id: resMedia.mediaMetaId,
                        caption: !!body_image?.caption ? body_image.caption : null,
                    };
                    dataMessage = {
                        id: resMedia.mediaMetaId,
                        caption: !!body_image?.caption ? body_image.caption : null,
                    };
                    break;
                case 'location':
                    if (!body_location.latitude && !body_location.longitude)
                        throw new Error('Necessário informar a latitude e longitude');
                    entity.location = {
                        latitude: body_location.latitude,
                        longitude: body_location.longitude,
                        name: !!body_location?.name ? body_location.name : null,
                        address: !!body_location?.address ? body_location.address : null,
                    };
                    dataMessage = {
                        latitude: body_location.latitude,
                        longitude: body_location.longitude,
                        name: !!body_location?.name ? body_location.name : null,
                        address: !!body_location?.address ? body_location.address : null,
                    };
                    break;
                case 'reaction':
                    if (!body_reaction.message_id || !body_reaction.emoji)
                        throw new Error('Necessário informar o id da mensagem e o emoji');
                    entity.reaction = {
                        message_id: body_reaction.message_id,
                        emoji: body_reaction.emoji,
                    };
                    dataMessage = {
                        message_id: body_reaction.message_id,
                        emoji: body_reaction.emoji,
                    };
                    break;
                case 'contacts':
                    entity.contacts = [body_contacts];
                    dataMessage = [body_contacts];
                    break;
                case 'interactive':
                    console.log(JSON.stringify(body_interactive, null, 2));
                    if (body_interactive.type == 'button' ||
                        body_interactive.type == 'list') {
                        entity.interactive = body_interactive;
                        dataMessage = body_interactive;
                    }
                    else {
                        throw new Error('O tipo de mensagem esta incorreto');
                    }
                    break;
                case 'sticker':
                    if (!body_sticket.id)
                        throw new Error('Necessário informar o id do sticker');
                    entity.sticker = { id: body_sticket.id };
                    dataMessage = { id: body_sticket.id };
                    break;
                case 'template':
                    entity.template = body_template;
                    dataMessage = body_template;
                    break;
                default:
                    throw new Error('Este tipo não é suportado pela meta');
            }
            const message = {
                to: data.to,
                type: data.type,
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                ...(data.quotedId && { context: { message_id: data.quotedId } }),
            };
            message[data.type] = dataMessage;
            const res = await this.metaService.sendMessage(whats.phone_number_id, whats.send_token, message);
            entity.idMessageWhatsApp = res.messages.map((m) => m.id);
            return await this.prisma.sendMessageWhatsApp.create({ data: entity });
        }
        catch (error) {
            this.logger.error(`createMessage - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
    async readMessage(token, messageId) {
        try {
            const body = {
                message_id: messageId,
                messaging_product: 'whatsapp',
                status: 'read',
            };
            const whats = await this.whatsAppService.prisma.whatsappOficial.findUnique({
                where: { token_mult100: token },
            });
            if (!whats)
                throw new Error('Nenhum número configurado para este token');
            return await this.metaService.sendReadMessage(whats.phone_number_id, whats.send_token, body);
        }
        catch (error) {
            this.logger.error(`readMessage - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
};
exports.SendMessageWhatsappService = SendMessageWhatsappService;
exports.SendMessageWhatsappService = SendMessageWhatsappService = SendMessageWhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_service_1.MetaService,
        whatsapp_oficial_service_1.WhatsappOficialService])
], SendMessageWhatsappService);
//# sourceMappingURL=send-message-whatsapp.service.js.map