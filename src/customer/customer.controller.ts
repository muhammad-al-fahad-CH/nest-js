import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CustomerDTO } from './dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(@Res() res: Response) {
    const data = await this.customerService.listCustomer();
    return res.status(200).send(data);
  }

  @Post()
  async addCustomer(@Body() customer: CustomerDTO, @Res() res: Response) {
    const data = await this.customerService.addCustomer(customer);
    return res.status(201).send(data);
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string, @Res() res: Response) {
    const data = await this.customerService.getCustomer(id);
    return res.status(200).send(data);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: string, @Body() customer: CustomerDTO, @Res() res: Response) {
    const data = await this.customerService.updateCustomer(id, customer);
    return res.status(200).send(data);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string, @Res() res: Response) {
    const data = await this.customerService.deleteCustomer(id);
    return res.status(200).send(data);
  }
}