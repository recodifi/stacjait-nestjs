import { Body, Controller, Get, Post, Delete, Param, NotFoundException } from '@nestjs/common';
import {ApiImplicitParam} from '@nestjs/swagger';
import { AppService } from './app.service';
import { ContactModel } from './models/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  public contacts = [];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('contacts/:id')
  @ApiImplicitParam({name: 'id', required: true, description: 'contact id', type: String})
  getContact(@Param('id') id: string) {
    const contact = this.contacts.find(c => c.id === parseInt(id, 10));
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  @Post('contacts')
  postContacts(@Body() data: ContactModel) {
    const contact = {
      name: '',
      ...data,
      id: this.contacts.length++,
    };
    this.contacts.push(contact);
    return contact;
  }

  @Delete('contacts/:id')
  deleteContacts(@Param('id') id: string) {
    this.contacts = this.contacts.filter(c => c.id !== parseInt(id, 10));
    return {id};
  }

}
