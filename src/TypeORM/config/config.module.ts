import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as dotenv from 'dotenv';

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    dotenv.config();
    const config = new ConfigService();
    config.loadFromDotenv();
    return config;
  },
};

@Module({
  imports: [],
  providers: [configFactory],
  exports: [configFactory],
})
export class ConfigModule {}
