import { WhatsappOficialService } from '../whatsapp-oficial/whatsapp-oficial.service';
import { WhatsAppOficial } from 'src/@core/domain/entities/whatsappOficial.model';
import { RedisService } from 'src/@core/infra/redis/RedisService.service';
import { RabbitMQService } from 'src/@core/infra/rabbitmq/RabbitMq.service';
import { SocketService } from 'src/@core/infra/socket/socket.service';
import { MetaService } from 'src/@core/infra/meta/meta.service';
export declare class WebhookService {
    private readonly rabbit;
    private readonly whatsAppService;
    private readonly redis;
    private readonly socket;
    private readonly meta;
    private logger;
    private messagesPermitidas;
    constructor(rabbit: RabbitMQService, whatsAppService: WhatsappOficialService, redis: RedisService, socket: SocketService, meta: MetaService);
    forwardToWebhook(whats: WhatsAppOficial, body: any): Promise<void>;
    sendToWebhook(webhook_url: string, token: string, body: any): Promise<any>;
    webhookCompanyConexao(companyId: number, conexaoId: number, data: any): Promise<boolean>;
    webhookCompany(companyId: number, conexaoId: number, mode: string, verify_token: string, challenge: string): Promise<string>;
}
