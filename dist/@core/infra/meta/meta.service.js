"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const convertMimeTypeToExtension_1 = require("../../common/utils/convertMimeTypeToExtension");
const axios_1 = __importDefault(require("axios"));
const mime_types_1 = require("mime-types");
const files_utils_1 = require("../../common/utils/files.utils");
class MetaService {
    constructor() {
        this.logger = new common_1.Logger(`${MetaService.name}`);
        this.urlMeta = `https://graph.facebook.com/v20.0`;
        this.path = `./public`;
    }
    async send(url, token, existFile = false) {
        const headers = {
            'Content-Type': !!existFile ? 'arraybuffer' : 'application/json',
            Authorization: `Bearer ${token}`,
            'User-Agent': 'curl/7.64.1',
        };
        const res = await fetch(url, {
            method: 'GET',
            headers: headers,
        });
        if (!!existFile) {
            return await res.json();
        }
        else {
            return (await res.json());
        }
    }
    async authFileMeta(idMessage, phone_number_id, token) {
        try {
            const url = `https://graph.facebook.com/v20.0/${idMessage}?phone_number_id=${phone_number_id}`;
            return await this.send(url, token);
        }
        catch (error) {
            this.logger.error(`authDownloadFile - ${error.message}`);
            throw Error('Erro ao converter o arquivo');
        }
    }
    async downloadFileMeta(idMessage, phone_number_id, token, companyId, conexao) {
        try {
            const auth = await this.authFileMeta(idMessage, phone_number_id, token);
            if (!(0, fs_1.existsSync)(this.path))
                (0, fs_1.mkdirSync)(this.path);
            if (!(0, fs_1.existsSync)(`${this.path}/${companyId}`))
                (0, fs_1.mkdirSync)(`${this.path}/${companyId}`);
            if (!(0, fs_1.existsSync)(`${this.path}/${companyId}/${conexao}`))
                (0, fs_1.mkdirSync)(`${this.path}/${companyId}/${conexao}`);
            const pathFile = `${this.path}/${companyId}/${conexao}`;
            const mimeType = (0, convertMimeTypeToExtension_1.convertMimeTypeToExtension)(auth.mime_type);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'User-Agent': 'curl/7.64.1',
            };
            const result = await axios_1.default.get(auth.url, {
                headers,
                responseType: 'arraybuffer',
            });
            if (result.status != 200)
                throw new Error('Falha em baixar o arquivo da meta');
            const base64 = result.data.toString('base64');
            (0, fs_1.writeFileSync)(`${pathFile}/${idMessage}.${mimeType}`, result.data);
            return {
                base64,
                mimeType: auth.mime_type,
            };
        }
        catch (error) {
            console.log(error);
            this.logger.error(`authDownloadFile - ${error.message}`);
            throw Error('Erro ao converter o arquivo');
        }
    }
    async sendFileToMeta(numberId, token, pathFile) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const formData = new FormData();
            const file = (0, fs_1.readFileSync)(pathFile);
            const mimeType = (0, mime_types_1.lookup)(pathFile);
            if (!mimeType) {
                throw new Error('Could not determine the MIME type of the file.');
            }
            const blob = new Blob([file], { type: mimeType });
            formData.append('messaging_product', 'whatsapp');
            formData.append('type', mimeType);
            formData.append('file', blob);
            const result = await fetch(`${this.urlMeta}/${numberId}/media`, {
                method: 'POST',
                headers,
                body: formData,
            });
            if (result.status != 200)
                throw new Error('Falha em baixar o arquivo da meta');
            return (await result.json());
        }
        catch (error) {
            (0, files_utils_1.deleteFile)(pathFile);
            this.logger.error(`sendMessage - ${error.message}`);
            throw Error('Erro ao enviar o arquivo para a meta');
        }
    }
    async sendMessage(numberId, token, message) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const result = await fetch(`${this.urlMeta}/${numberId}/messages`, {
                method: 'POST',
                headers,
                body: JSON.stringify(message),
            });
            if (result.status != 200) {
                const resultError = await result.json();
                throw new Error(resultError.error.message || 'Falha ao enviar mensagem para a meta');
            }
            return (await result.json());
        }
        catch (error) {
            this.logger.error(`sendMessage - ${error.message}`);
            throw Error('Erro ao enviar a mensagem');
        }
    }
    async getListTemplates(businessId, token) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const result = await fetch(`${this.urlMeta}/${businessId}/message_templates`, {
                method: 'GET',
                headers,
            });
            if (result.status != 200) {
                const resultError = await result.json();
                throw new Error(resultError.error.message || 'Falha ao enviar mensagem para a meta');
            }
            return (await result.json());
        }
        catch (error) {
            this.logger.error(`getListTemplates - ${error.message}`);
            throw Error('Erro ao enviar a mensagem');
        }
    }
    async sendReadMessage(numberId, token, data) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            console.log(data);
            const result = await fetch(`${this.urlMeta}/${numberId}/messages`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            if (result.status != 200) {
                const resultError = await result.json();
                throw new Error(resultError.error.message || 'Falha ao enviar mensagem para a meta');
            }
            return (await result.json());
        }
        catch (error) {
            this.logger.error(`sendReadMessage - ${error.message}`);
            throw Error('Erro ao marcar a mensagem como lida');
        }
    }
}
exports.MetaService = MetaService;
//# sourceMappingURL=meta.service.js.map