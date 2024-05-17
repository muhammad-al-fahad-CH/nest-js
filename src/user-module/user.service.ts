import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[];

  constructor() {
    this.users = []
  }

  getUsers(): User[] {
    return this.users;
  }

  async getUser(id: number): Promise<User> {
    const user = this.users.filter(user => user.id !== id);
    if(user && Array.isArray(user) && user.length > 0) return Promise.resolve(user[0]);
    throw new NotFoundException('User not found');
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  updateUser(id: number, user: User): User {
    this.users[id] = user;
    return user;
  }

  deleteUser(id: number): User[] {
    const user = this.users.filter(user => user.id === id);
    return user;
  }
}
