import { IReceivedWhatsppOficial, IReceivedWhatsppOficialRead } from 'src/@core/interfaces/IWebsocket.interface';
export declare class SocketService {
    private socket;
    private url;
    id: number;
    private logger;
    constructor();
    connect(id: number): void;
    sendMessage(data: IReceivedWhatsppOficial): void;
    readMessage(data: IReceivedWhatsppOficialRead): void;
    private setupSocketEvents;
}
