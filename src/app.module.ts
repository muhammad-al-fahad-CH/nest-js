import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user-module/user.module';
// import { TaskModule } from './task-module/task.module';
// import { MongoDBModule } from './mongoose/database.module';
// import { CustomerModule } from './customer/customer.module';
// import { MySQLModule } from './mysql/database.module';
import { typeORMModule } from './TypeORM/database.module';
import ContactEntity from './entities/contact';

@Module({
  imports: [typeORMModule.forRoot({ entities: [ContactEntity] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
