import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CustomerSchema from './customer.schema';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/mysql/entity/user.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([{
    //     name: "Customer",
    //     schema: CustomerSchema
    // }]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
