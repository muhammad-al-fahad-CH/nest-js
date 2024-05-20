import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './user-module/filter';
import { AuthGuard } from './user-module/guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this middleware are used as global if we don't use in API's
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3001);
}
bootstrap();
