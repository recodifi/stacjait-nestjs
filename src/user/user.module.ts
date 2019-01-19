import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserMiddleware } from './middlewares/user.middleware';
import {logger} from './middlewares/logger.middleware';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(logger, UserMiddleware).forRoutes(UserController);
  }
}
