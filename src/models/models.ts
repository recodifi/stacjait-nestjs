import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class ContactModel {
  @ApiModelPropertyOptional()
  id: number;
  @ApiModelProperty()
  name: string;
}

export enum UserRole {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class UserModel {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  roles?: UserRole[];
}

export class TokenPayloadModel {
  user: UserModel;
}
