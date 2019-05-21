import { ApiModelProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name?: string;

    @IsAlphanumeric()
    readonly email: string;

    @IsOptional()
    @MinLength(8)
    readonly password?: string;
}

export class CredentialDto {
    @ApiModelProperty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @MinLength(8)
    readonly password: string;
}
