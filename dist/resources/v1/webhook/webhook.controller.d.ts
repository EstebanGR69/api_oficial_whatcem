import { WebhookService } from './webhook.service';
import { IWebhookWhatsApp } from './interfaces/IWebhookWhatsApp.inteface';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    webhookCompanyConexao(companyId: number, conexaoId: number, data: IWebhookWhatsApp): Promise<boolean>;
    webhookCompany(companyId: number, conexaoId: number, mode: string, verify_token: string, challenge: string): Promise<string>;
}
