import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column('text')
  phone: string;

  @Column()
  address: string;

  @Column('int')
  age: number;

  @Column()
  owner: boolean;
}