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
var SocketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const socket_io_client_1 = require("socket.io-client");
let SocketService = SocketService_1 = class SocketService {
    constructor() {
        this.logger = new common_1.Logger(`${SocketService_1.name}`);
    }
    connect(id) {
        try {
            this.url = process.env.URL_BACKEND_MULT100;
            if (!this.url)
                throw new Error('Nenhuma configuração do url do backend');
            this.id = id;
            this.socket = (0, socket_io_client_1.io)(`${this.url}/${id}`, {
                query: {
                    token: `Bearer ${process.env.TOKEN_ADMIN || ''}`,
                },
            });
            this.setupSocketEvents();
        }
        catch (error) {
            this.logger.error(`Erro ao conectar com o websocket da API Mult100 - ${error.message}`);
        }
    }
    sendMessage(data) {
        this.logger.warn(`Conectando ao websocket da empresa ${data.companyId}`);
        this.connect(data.companyId);
        this.logger.warn(`Enviando mensagem para o websocket para a empresa ${data.companyId}`);
        this.socket.emit('receivedMessageWhatsAppOficial', data);
        setTimeout(() => {
            this.logger.warn(`Fechando conexão do websocket para a empresa ${data.companyId}`);
            this.socket.close();
        }, 1500);
    }
    readMessage(data) {
        this.logger.warn(`Conectando ao websocket da empresa ${data.companyId}`);
        this.connect(data.companyId);
        this.logger.warn(`Enviando mensagem para o websocket para a empresa ${data.companyId}`);
        this.socket.emit('readMessageWhatsAppOficial', data);
        setTimeout(() => {
            this.logger.warn(`Fechando conexão do websocket para a empresa ${data.companyId}`);
            this.socket.close();
        }, 1500);
    }
    setupSocketEvents() {
        this.socket.on('connect', () => {
            this.logger.log(`Conectado ao websocket do servidor ${this.url}/${this.id}`);
        });
        this.socket.on('connect_error', (error) => {
            this.logger.error(`Erro de conexão: ${error}`);
        });
        this.socket.on('disconnect', () => {
            this.logger.error(`Desconectado do websocket do servidor ${this.url}/${this.id}`);
        });
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = SocketService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SocketService);
//# sourceMappingURL=socket.service.js.map