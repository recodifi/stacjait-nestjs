import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from '../dto';
import { UserModel } from '../../models';
import {UserRole} from '../../models';

@Injectable()
export class UserService {

  public users: UserModel[] = [{
    id: 1,
    name: 'Piotr',
    email: 'piotr@myflow.pl',
    password: '123',
    roles: [UserRole.ADMIN],
  }];

  async create(data: UserRegisterRequestDto): Promise<UserModel> {
    const user: UserModel = {
      id: this.users.length + 1,
      email: data.email,
      name: data.name,
      password: data.password,
      roles: [],
    };
    this.users.push(user);
    return user;
  }

  async findByCredentials(email: string, password: string) {
    return this.users.find(user => user.email === email && user.password === password);
  }

  async getById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
