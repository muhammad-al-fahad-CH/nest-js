import { IsDate, IsDefined, IsEmail, IsEmpty, IsString } from "class-validator";

export class CustomerDTO {
    @IsString()
    @IsDefined()
    readonly first_name: string;

    @IsString()
    @IsDefined()
    readonly last_name: string;

    @IsEmail()
    @IsDefined()
    readonly email: string;

    @IsString()
    @IsDefined()
    readonly phone: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly description: string;

    @IsEmpty()
    readonly created_at: Date;
}