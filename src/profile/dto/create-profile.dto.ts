import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateProfileDto {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly userId: number;

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    readonly surname: string;

    @ApiProperty({ example: '79102223344', description: 'Номер телефона пользователя' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly phone: string;

}