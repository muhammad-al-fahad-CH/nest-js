import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer } from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/mysql/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  // constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async listCustomer(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async addCustomer(customer: CustomerDTO): Promise<User> {
    const newCustomer = this.userRepository.create(customer);
    return await this.userRepository.save(newCustomer);
  }

  public async getCustomer(id: string): Promise<User> {
    const numberId = parseInt(id)
    return await this.userRepository.findOne({ where: { id: numberId } });
  }

  public async updateCustomer(id: string, customer: Partial<CustomerDTO>): Promise<User> {
    const numberId = parseInt(id)
    await this.userRepository.update(id, customer);
    return await this.userRepository.findOne({ where: { id: numberId } });
  }

  public async deleteCustomer(id: string): Promise<User> {
    const numberId = parseInt(id)
    const removerUser = await this.userRepository.findOne({ where: { id: numberId } });
    return await this.userRepository.remove(removerUser);
  }
}