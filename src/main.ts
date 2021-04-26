import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  dotenv.config();
  app.setGlobalPrefix('/api/ecommerce');
  await app.listen(8001);
}
bootstrap();
