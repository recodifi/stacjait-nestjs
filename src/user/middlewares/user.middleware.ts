import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.headers[this.config.TOKEN_HEADER_NAME]) {
        const payload = this.authService.tokenVerify(req.headers[this.config.TOKEN_HEADER_NAME]);
        if (payload) {
          req.tokenPayload = payload;
        }
      }
      next();
    };
  }
}
