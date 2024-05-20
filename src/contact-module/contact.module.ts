import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContactEntity from 'src/entities/contact';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [],
  providers: [],
})
export class ContactModule {}
