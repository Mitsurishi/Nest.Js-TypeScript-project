import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'Электронная почта' })
    readonly email: string;

    @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
    readonly password: string;

}