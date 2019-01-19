import { Controller, Post, Body, Get, UseGuards, HttpStatus, HttpException, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import {ApiCreatedResponse, ApiBearerAuth, ApiImplicitParam} from '@nestjs/swagger';
import { UserRegisterRequestDto, UserRegisterResponseDto, UserLoginRequestDto, UserLoginResponseDto } from '../dto';
import { UserService } from '../services/user.service';
import {User} from '../decorators/user.decorator';
import { UserModel, UserRole } from '../../models';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import {AuthService} from '../services/auth.service';
import {UserByIdPipe} from '../pipes/user-by-id.pipe';

@Controller('user')
export class UserController {

  constructor(private userService: UserService, private authService: AuthService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async getUser(@User() user: UserModel) {
    return user;
  }

  @Post('register')
  @ApiCreatedResponse({type: UserRegisterResponseDto})
  async register(@Body() data: UserRegisterRequestDto): Promise<UserRegisterResponseDto> {
    const user = await this.userService.create(data);
    console.info('data::', data);
    return {
      user,
    };
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() credentials: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    if (credentials.password !== '123') {
      throw new HttpException('ValidationError', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const user = await this.userService.findByCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return {
      token: this.authService.tokenSign({user}),
      user,
    };
  }

  @Get(':id')
  @ApiImplicitParam({name: 'id', type: Number})
  getUserById(@Param('id', UserByIdPipe) user: UserModel) {
    return user;
  }
}
