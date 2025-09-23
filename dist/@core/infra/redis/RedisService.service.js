"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
class RedisService {
    constructor() {
        this.logger = new common_1.Logger('RedisServer');
        this.logger.log('🔄 Iniciando conexão com Redis...');
        try {
            this.client = new ioredis_1.Redis(process.env.REDIS_URI);
            this.logger.log(`📡 Conexão com Redis estabelecida com sucesso`);
        }
        catch (error) {
            this.logger.error(`❌ Erro ao conectar com Redis: ${error}`);
        }
    }
    async set(key, value) {
        await this.client.set(key, value);
    }
    async get(key) {
        return await this.client.get(key);
    }
    async del(key) {
        return await this.client.del(key);
    }
    async keys(pattern) {
        return await this.client.keys(pattern);
    }
    async quit() {
        try {
            await this.client.quit();
            this.logger.log('👋 Conexão com Redis encerrada com sucesso');
        }
        catch (error) {
            this.logger.error(`❌ Erro ao encerrar conexão com Redis: ${error}`);
        }
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=RedisService.service.js.map