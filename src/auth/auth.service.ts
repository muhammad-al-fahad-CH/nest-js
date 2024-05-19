import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../shared/user.service';
import { Payload } from '../user-module/interface/payload';
import User from '../entities/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload): Promise<User> {
    return await this.userService.findByUserName(payload.username);
  }
}
