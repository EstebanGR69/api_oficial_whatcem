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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageWhatsappController = void 0;
const common_1 = require("@nestjs/common");
const send_message_whatsapp_service_1 = require("./send-message-whatsapp.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const auth_decorator_1 = require("../../../@core/guard/auth.decorator");
let SendMessageWhatsappController = class SendMessageWhatsappController {
    constructor(service) {
        this.service = service;
    }
    sendMessage(token, data, file) {
        return this.service.createMessage(token, data, file);
    }
    readMessage(token, messageId) {
        return this.service.readMessage(token, messageId);
    }
};
exports.SendMessageWhatsappController = SendMessageWhatsappController;
__decorate([
    (0, common_1.Post)(':token'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enviar Mensagem com o Whatsapp Oficial' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao salvar a mensagem para enviar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna o registro salvo no banco para enviar a mensagem do whats',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], SendMessageWhatsappController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('read-message/:token/:messageId'),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enviar Mensagem com o Whatsapp Oficial' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao salvar a mensagem para enviar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna o registro salvo no banco para enviar a mensagem do whats',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SendMessageWhatsappController.prototype, "readMessage", null);
exports.SendMessageWhatsappController = SendMessageWhatsappController = __decorate([
    (0, common_1.Controller)('v1/send-message-whatsapp'),
    __metadata("design:paramtypes", [send_message_whatsapp_service_1.SendMessageWhatsappService])
], SendMessageWhatsappController);
//# sourceMappingURL=send-message-whatsapp.controller.js.map