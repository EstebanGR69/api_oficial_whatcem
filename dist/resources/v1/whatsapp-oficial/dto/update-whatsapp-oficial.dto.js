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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWhatsappOficialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_whatsapp_oficial_dto_1 = require("./create-whatsapp-oficial.dto");
const class_validator_1 = require("class-validator");
class UpdateWhatsappOficialDto extends (0, swagger_1.PartialType)(create_whatsapp_oficial_dto_1.CreateWhatsappOficialDto) {
}
exports.UpdateWhatsappOficialDto = UpdateWhatsappOficialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'chatwoot webhook url',
        default: 'http://url.com.br',
        example: 'http://url.com.br',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "chatwoot_webhook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'chatwoot webhook token',
        default: 'TOKENCHATWOOT',
        example: 'TOKENCHATWOOT',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "auth_token_chatwoot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'n8n webhook url',
        default: 'http://url.com.br',
        example: 'http://url.com.br',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "n8n_webhook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'n8n webhook token',
        default: 'TOKENN8N',
        example: 'TOKENN8N',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "auth_token_n8n", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'crm webhook url',
        default: 'http://url.com.br',
        example: 'http://url.com.br',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "crm_webhook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'crm webhook token',
        default: 'TOKENCRM',
        example: 'TOKENCRM',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "auth_token_crm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'typebot webhook url',
        default: 'http://url.com.br',
        example: 'http://url.com.br',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "typebot_webhook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'typebot webhook token',
        default: 'TOKENTYPEBOT',
        example: 'TOKENTYPEBOT',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "auth_token_typebot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'caso utilize o rabbitmq coloque true',
        default: false,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateWhatsappOficialDto.prototype, "use_rabbitmq", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do whatsapp do Mult 100',
        default: 1,
        example: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "token_mult100", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'id do telefone do business meta',
        default: 'PHONENUMBERID',
        example: 'PHONENUMBERID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "phone_number_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'identificação da meta business',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "waba_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'token de envio api',
        default: 'TOKENENVIOAPI',
        example: 'TOKENENVIOAPI',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "send_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'id da empresa',
        default: 'BUSINESSID',
        example: 'BUSINESSID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "business_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'numero telefone',
        default: '+55000111111111',
        example: '+55000111111111',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'routing key do RabbitMQ',
        default: 'routing_key',
        example: 'routing_key',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWhatsappOficialDto.prototype, "rabbitmq_routing_key", void 0);
//# sourceMappingURL=update-whatsapp-oficial.dto.js.map