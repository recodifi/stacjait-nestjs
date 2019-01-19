import { NestFactory } from '@nestjs/core';
import * as moduleAlias from 'module-alias';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ConfigService} from './config/config.service';

moduleAlias.addPath(__dirname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new ConfigService();
  const options = new DocumentBuilder()
    .addBearerAuth(config.TOKEN_HEADER_NAME, 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
