import { NestFactory } from '@nestjs/core';
import * as moduleAlias from 'module-alias';
import { AppModule } from './app.module';

moduleAlias.addPath(__dirname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
