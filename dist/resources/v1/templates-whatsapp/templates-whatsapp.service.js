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
var TemplatesWhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesWhatsappService = void 0;
const common_1 = require("@nestjs/common");
const meta_service_1 = require("../../../@core/infra/meta/meta.service");
const whatsapp_oficial_service_1 = require("../whatsapp-oficial/whatsapp-oficial.service");
const app_error_1 = require("../../../@core/infra/errors/app.error");
let TemplatesWhatsappService = TemplatesWhatsappService_1 = class TemplatesWhatsappService {
    constructor(whatsappOficial, metaService) {
        this.whatsappOficial = whatsappOficial;
        this.metaService = metaService;
        this.logger = new common_1.Logger(`${TemplatesWhatsappService_1}`);
    }
    async findAll(token) {
        try {
            const conexao = await this.whatsappOficial.prisma.whatsappOficial.findUnique({
                where: {
                    token_mult100: token,
                    deleted_at: null,
                },
            });
            if (!conexao) {
                this.logger.error(`Nenhuma conexão existente com este token ${token}`);
                throw new Error(`Nenhuma conexão existente com este token ${token}`);
            }
            return await this.metaService.getListTemplates(conexao.business_id, conexao.send_token);
        }
        catch (error) {
            this.logger.error(`findAll - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
};
exports.TemplatesWhatsappService = TemplatesWhatsappService;
exports.TemplatesWhatsappService = TemplatesWhatsappService = TemplatesWhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_oficial_service_1.WhatsappOficialService,
        meta_service_1.MetaService])
], TemplatesWhatsappService);
//# sourceMappingURL=templates-whatsapp.service.js.map