import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from './middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
// this middleware also used in main instead of using in every API
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'user',
          method: RequestMethod.GET,
        },
        {
          path: 'user/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(UserController);
  }
}
