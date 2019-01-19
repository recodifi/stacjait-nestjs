import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [UserModule, SharedModule, ConfigModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
