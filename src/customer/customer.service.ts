import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer } from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDTO } from './dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  public async listCustomer(): Promise<Customer []> {
    return await this.customerModel.find();
  }

  public async addCustomer(customer: CustomerDTO): Promise<Customer> {
    const newCustomer = new this.customerModel(customer);
    return await newCustomer.save();
  }

  public async getCustomer(id: string): Promise<Customer> {
    return await this.customerModel.findById(id).exec();
  }

  public async updateCustomer(id: string, customer: Partial<CustomerDTO>): Promise<Customer> {
    return await this.customerModel.findByIdAndUpdate(id, customer);
  }

  public async deleteCustomer(id: string): Promise<Customer> {
    return await this.customerModel.findByIdAndDelete(id);
  }
}