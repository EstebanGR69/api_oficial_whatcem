"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesWhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const templates_whatsapp_service_1 = require("./templates-whatsapp.service");
const templates_whatsapp_controller_1 = require("./templates-whatsapp.controller");
const meta_service_1 = require("../../../@core/infra/meta/meta.service");
const whatsapp_oficial_service_1 = require("../whatsapp-oficial/whatsapp-oficial.service");
const RabbitMq_service_1 = require("../../../@core/infra/rabbitmq/RabbitMq.service");
let TemplatesWhatsappModule = class TemplatesWhatsappModule {
};
exports.TemplatesWhatsappModule = TemplatesWhatsappModule;
exports.TemplatesWhatsappModule = TemplatesWhatsappModule = __decorate([
    (0, common_1.Module)({
        controllers: [templates_whatsapp_controller_1.TemplatesWhatsappController],
        providers: [
            templates_whatsapp_service_1.TemplatesWhatsappService,
            whatsapp_oficial_service_1.WhatsappOficialService,
            meta_service_1.MetaService,
            RabbitMq_service_1.RabbitMQService,
        ],
    })
], TemplatesWhatsappModule);
//# sourceMappingURL=templates-whatsapp.module.js.map