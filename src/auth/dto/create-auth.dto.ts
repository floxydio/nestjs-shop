import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Min, IsString } from 'class-validator';


export class CreateAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Min(6)
    @IsString()
    password: string;
}

