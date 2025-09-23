import { IBodyReadMessage, IMetaMessage, IResultTemplates, IReturnAuthMeta, IReturnMessageFile, IReturnMessageMeta } from './interfaces/IMeta.interfaces';
export declare class MetaService {
    private readonly logger;
    urlMeta: string;
    path: string;
    constructor();
    send<T>(url: string, token: string, existFile?: boolean): Promise<T | any>;
    authFileMeta(idMessage: string, phone_number_id: string, token: string): Promise<IReturnAuthMeta>;
    downloadFileMeta(idMessage: string, phone_number_id: string, token: string, companyId: number, conexao: number): Promise<{
        base64: string;
        mimeType: string;
    }>;
    sendFileToMeta(numberId: string, token: string, pathFile: string): Promise<IReturnMessageFile | null>;
    sendMessage(numberId: string, token: string, message: IMetaMessage): Promise<IReturnMessageMeta>;
    getListTemplates(businessId: string, token: string): Promise<IResultTemplates>;
    sendReadMessage(numberId: string, token: string, data: IBodyReadMessage): Promise<IResultTemplates>;
}
