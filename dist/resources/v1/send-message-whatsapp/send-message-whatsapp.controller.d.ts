import { SendMessageWhatsappService } from './send-message-whatsapp.service';
export declare class SendMessageWhatsappController {
    private readonly service;
    constructor(service: SendMessageWhatsappService);
    sendMessage(token: string, data: string, file: Express.Multer.File): Promise<{
        type: import(".prisma/client").$Enums.typeMessage;
        id: number;
        create_at: Date | null;
        update_at: Date | null;
        deleted_at: Date | null;
        text: import("@prisma/client/runtime/library").JsonValue | null;
        image: import("@prisma/client/runtime/library").JsonValue | null;
        audio: import("@prisma/client/runtime/library").JsonValue | null;
        document: import("@prisma/client/runtime/library").JsonValue | null;
        video: import("@prisma/client/runtime/library").JsonValue | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        contacts: import("@prisma/client/runtime/library").JsonValue | null;
        interactive: import("@prisma/client/runtime/library").JsonValue | null;
        sticker: import("@prisma/client/runtime/library").JsonValue | null;
        reaction: import("@prisma/client/runtime/library").JsonValue | null;
        template: import("@prisma/client/runtime/library").JsonValue | null;
        to: string;
        enviada: boolean;
        pathFile: string | null;
        idFileMeta: string | null;
        idMessageWhatsApp: import("@prisma/client/runtime/library").JsonValue | null;
        whatsappOficialId: number;
    }>;
    readMessage(token: string, messageId: string): Promise<import("../../../@core/infra/meta/interfaces/IMeta.interfaces").IResultTemplates>;
}
