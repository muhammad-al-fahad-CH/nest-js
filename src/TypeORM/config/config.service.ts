import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDBData } from './config.interface';
import { DEFAULT_CONFIG } from './config.default';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromDotenv() {
    this.config = this.parseConfigFromEnv(process.env);
  }
  parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      db: this.parseDBConfigFromEnv(env) || DEFAULT_CONFIG.db,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
    };
  }
  parseDBConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {
    return {
      type: env.DB_TYPE || '',
      host: env.MYSQL_DB_HOST || '',
      port: parseInt(env.MYSQL_DB_PORT || 'NaN', 10),
      name: env.MYSQL_DB || '',
      pass: env.MYSQL_PASSWORD || '',
      user: env.MYSQL_USER || '',
      dialect: env.DB_DIALECT || '',
      charset: env.DB_CHARSET || '',
      collate: env.DB_COLLATE || '',
    };
  }

  // parseRedisConfigFromEnv(env: NodeJS.ProcessEnv): ConfigRedis {
  //   return {
  //     url: env.REDIS_URL || '',
  //     retryAttempts: parseInt(env.REDIS_RETRY_ATTEMPTS || 'NaN', 10),
  //     retryDelay: parseInt(env.REDIS_RETRY_DELAY || 'NaN', 10),
  //   };
  // }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
