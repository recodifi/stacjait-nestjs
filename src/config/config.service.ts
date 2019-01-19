import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  JWT_SECRET = 'jwt-secret';
  TOKEN_HEADER_NAME = 'auth-token';
  STORAGE_TMP = 'storage/tmp';
  STORAGE_PHOTOS = 'storage/photos';
}
