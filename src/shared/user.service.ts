import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import User from '../entities/user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  // user register
  async create(userDTO: RegisterDTO): Promise<User> {
    try {
      const { username, password } = userDTO;
      const user = await this.userRepo.findOne({ where: { username } });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      /*const errors = await validate(newUser);
    if(errors && errors.length > 0){
      throw new BadRequestException(errors);
    } */
      newUser.hashPassword();
      return await this.userRepo.save(newUser);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findByUserName(username: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      if (user) {
        throw new HttpException(
          'User does not exist in system',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  sanitizeUser(user: User) {
    const obj = { ...user };
    delete obj['password'];
    return obj;
  }
}
