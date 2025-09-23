import { Logger } from '@nestjs/common';
import { MetaService } from 'src/@core/infra/meta/meta.service';
import { WhatsappOficialService } from '../whatsapp-oficial/whatsapp-oficial.service';
export declare class TemplatesWhatsappService {
    private readonly whatsappOficial;
    private readonly metaService;
    logger: Logger;
    constructor(whatsappOficial: WhatsappOficialService, metaService: MetaService);
    findAll(token: string): Promise<import("../../../@core/infra/meta/interfaces/IMeta.interfaces").IResultTemplates>;
}
