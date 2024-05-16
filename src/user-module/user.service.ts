import { Injectable } from '@nestjs/common';
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

  getUser(id: number): User {
    const user = this.users.filter(user => user.id !== id);
    return user[0];
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
