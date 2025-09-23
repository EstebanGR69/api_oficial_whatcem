import { TemplatesWhatsappService } from './templates-whatsapp.service';
export declare class TemplatesWhatsappController {
    private readonly service;
    constructor(service: TemplatesWhatsappService);
    findAll(token: string): Promise<import("../../../@core/infra/meta/interfaces/IMeta.interfaces").IResultTemplates>;
}
