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
exports.TemplatesWhatsappController = void 0;
const common_1 = require("@nestjs/common");
const templates_whatsapp_service_1 = require("./templates-whatsapp.service");
const swagger_1 = require("@nestjs/swagger");
let TemplatesWhatsappController = class TemplatesWhatsappController {
    constructor(service) {
        this.service = service;
    }
    findAll(token) {
        return this.service.findAll(token);
    }
};
exports.TemplatesWhatsappController = TemplatesWhatsappController;
__decorate([
    (0, common_1.Get)(':token'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna registros do templates' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao encontrar os templates com o Whatsapp Oficial',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna os registros de templates do Whatsapp Oficial',
    }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplatesWhatsappController.prototype, "findAll", null);
exports.TemplatesWhatsappController = TemplatesWhatsappController = __decorate([
    (0, common_1.Controller)('v1/templates-whatsapp'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Templates WhatsApp'),
    __metadata("design:paramtypes", [templates_whatsapp_service_1.TemplatesWhatsappService])
], TemplatesWhatsappController);
//# sourceMappingURL=templates-whatsapp.controller.js.map