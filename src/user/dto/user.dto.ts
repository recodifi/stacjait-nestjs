import { UserModel } from 'models';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MinLength} from 'class-validator';

export class UserRegisterRequestDto {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}

export class UserRegisterResponseDto {
  @ApiModelProperty()
  user: UserModel;
}

export class UserLoginRequestDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;
  @ApiModelProperty()
  @IsString()
  @MinLength(3)
  password: string;
}

export class UserLoginResponseDto {
  token: string;
  user: UserModel;
}
