import { CreateWhatsappOficialDto } from './create-whatsapp-oficial.dto';
declare const UpdateWhatsappOficialDto_base: import("@nestjs/common").Type<Partial<CreateWhatsappOficialDto>>;
export declare class UpdateWhatsappOficialDto extends UpdateWhatsappOficialDto_base {
    chatwoot_webhook_url?: string;
    auth_token_chatwoot?: string;
    n8n_webhook_url?: string;
    auth_token_n8n?: string;
    crm_webhook_url?: string;
    auth_token_crm?: string;
    typebot_webhook_url?: string;
    auth_token_typebot?: string;
    use_rabbitmq?: boolean;
    token_mult100?: string;
    phone_number_id?: string;
    waba_id?: string;
    send_token?: string;
    business_id?: string;
    phone_number?: string;
    rabbitmq_routing_key?: string;
}
export {};
