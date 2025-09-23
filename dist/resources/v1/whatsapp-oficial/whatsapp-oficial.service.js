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
var WhatsappOficialService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappOficialService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../@core/base/base.service");
const app_error_1 = require("../../../@core/infra/errors/app.error");
let WhatsappOficialService = WhatsappOficialService_1 = class WhatsappOficialService extends base_service_1.BaseService {
    constructor() {
        super('whatsappOficial', WhatsappOficialService_1.name);
        this.logger = new common_1.Logger(`${WhatsappOficialService_1.name}`);
    }
    async oneWhatAppOficial(id) {
        try {
            const whats = await this.prisma.whatsappOficial.findUnique({
                where: { id, deleted_at: null },
            });
            if (!whats)
                throw new Error('Configuração do whats não encontrada');
            return whats;
        }
        catch (error) {
            this.logger.error(`createWhatsAppOficial - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
    async allWhatsAppOficial() {
        try {
            const company = await this.prisma.company.findFirst({
                where: { deleted_at: null },
            });
            if (!company)
                throw new Error('Empresa não encontrada');
            return await this.prisma.whatsappOficial.findMany({
                where: { companyId: company.id, deleted_at: null },
            });
        }
        catch (error) {
            this.logger.error(`createWhatsAppOficial - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
    async createWhatsAppOficial(data) {
        try {
            const company = await this.prisma.company.findFirst({
                where: {
                    idEmpresaMult100: data.idEmpresaMult100,
                    deleted_at: null,
                },
            });
            if (!company)
                throw new Error('Empresa não encontrada');
            const exist = await this.prisma.whatsappOficial.findUnique({
                where: { token_mult100: data.token_mult100 },
            });
            if (!!exist)
                throw new Error('Já existe esse token cadastrado');
            delete data.idEmpresaMult100;
            const whats = {
                ...data,
                companyId: company.id,
                token_mult100: data.token_mult100,
            };
            return await this.prisma.whatsappOficial.create({ data: whats });
        }
        catch (error) {
            this.logger.error(`createWhatsAppOficial - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
    async updateWhatsAppOficial(id, data) {
        try {
            const whats = await this.prisma.whatsappOficial.findUnique({
                where: { id, deleted_at: null },
            });
            if (!whats)
                throw new Error('Configuração do whats não encontrada');
            const company = await this.prisma.company.findFirst({
                where: { deleted_at: null },
            });
            if (!company)
                throw new Error('Empresa não encontrada');
            return await this.prisma.whatsappOficial.update({
                where: { id },
                data: data,
            });
        }
        catch (error) {
            this.logger.error(`updateWhatsAppOficial - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
    async deleteWhatsAppOficial(id) {
        try {
            const whats = await this.prisma.whatsappOficial.findUnique({
                where: { id, deleted_at: null },
            });
            if (!whats)
                throw new Error('Configuração do whats não encontrada');
            const company = await this.prisma.company.findFirst({
                where: { deleted_at: null },
            });
            if (!company)
                throw new Error('Empresa não encontrada');
            return await this.prisma.whatsappOficial.update({
                where: { id },
                data: { deleted_at: new Date() },
            });
        }
        catch (error) {
            this.logger.error(`deleteWhatsAppOficial - ${error.message}`);
            throw new app_error_1.AppError(error.message);
        }
    }
};
exports.WhatsappOficialService = WhatsappOficialService;
exports.WhatsappOficialService = WhatsappOficialService = WhatsappOficialService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WhatsappOficialService);
//# sourceMappingURL=whatsapp-oficial.service.js.map