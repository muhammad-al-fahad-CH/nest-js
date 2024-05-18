import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): string {
    return 'get user info';
  }

  @Post()
  postUser(): string {
    return 'send user info';
  }
}
