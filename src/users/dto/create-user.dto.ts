import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'Электронная почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(8, 32, { message: 'Не менее 8 и не более 32 символов' })
    readonly password: string;

}