import { IsDefined, IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    @IsDefined()
    name: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    address: string;
}