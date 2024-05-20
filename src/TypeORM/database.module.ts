import { DynamicModule, Module, NotImplementedException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from 'src/TypeORM/config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigDBData } from './config/config.interface';
import { DbConfig } from './database.interface';

@Module({})
export class typeORMModule {
  public static forRoot(dbConfig: DbConfig): DynamicModule {
    return {
      module: typeORMModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
            typeORMModule.getConnection(configService, dbConfig),
          inject: [ConfigService],
        }),
      ],
    };
  }
  public static getConnection(
    configService: ConfigService,
    dbConfig: DbConfig,
  ): TypeOrmModuleOptions {
    const dbData = configService.get().db;
    let connectionOptions: TypeOrmModuleOptions;

    if (dbData.type === 'mysql') {
      connectionOptions = this.getMySQLDBConfig(dbData);
    } else {
      throw new NotImplementedException(`${dbData.type} database not found`);
    }

    return {
      ...connectionOptions,
      entities: dbConfig.entities,
      logging: true,
    };
  }
  private static getMySQLDBConfig(dbdata: ConfigDBData): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: dbdata.host,
      port: dbdata.port,
      username: dbdata.user,
      password: dbdata.pass,
      database: dbdata.name,
      charset: dbdata.charset,
      extra: {
        collate: dbdata.collate,
        dialect: dbdata.dialect,
      },
    };
  }
}
