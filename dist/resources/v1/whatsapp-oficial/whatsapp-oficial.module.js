"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappOficialModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_oficial_service_1 = require("./whatsapp-oficial.service");
const whatsapp_oficial_controller_1 = require("./whatsapp-oficial.controller");
const client_1 = require("@prisma/client");
const RabbitMq_service_1 = require("../../../@core/infra/rabbitmq/RabbitMq.service");
const dotenv = __importStar(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const myEnv = dotenv.config();
dotenv_expand_1.default.expand(myEnv);
let WhatsappOficialModule = class WhatsappOficialModule {
};
exports.WhatsappOficialModule = WhatsappOficialModule;
exports.WhatsappOficialModule = WhatsappOficialModule = __decorate([
    (0, common_1.Module)({
        controllers: [whatsapp_oficial_controller_1.WhatsappOficialController],
        providers: [whatsapp_oficial_service_1.WhatsappOficialService, client_1.PrismaClient, RabbitMq_service_1.RabbitMQService],
        exports: [whatsapp_oficial_service_1.WhatsappOficialService],
    })
], WhatsappOficialModule);
//# sourceMappingURL=whatsapp-oficial.module.js.map