import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user-module/user.module';
import { TaskModule } from './task-module/task.module';
import { MongoDBModule } from './mongoose/database.module';
import { CustomerModule } from './customer/customer.module';
import { MySQLModule } from './mysql/database.module';

@Module({
  imports: [UserModule, TaskModule, MySQLModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
