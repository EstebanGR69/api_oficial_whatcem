export declare class RedisService {
    private client;
    private logger;
    constructor();
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    quit(): Promise<void>;
}
