import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTextBlockDto {

    @ApiProperty({ example: 'main-hero-text', description: 'Уникальное название для поиска' })
    @IsString({ message: 'Должно быть строкой' })
    readonly search_name: string;

    @ApiProperty({ example: 'Some name', description: 'Название текстового блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;

    @ApiProperty({ example: 'picturejpg', description: 'Имя файла' })
    @IsString({ message: 'Должно быть строкой' })
    readonly file: string;

    @ApiProperty({ example: 'Some text', description: 'Текст блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly text: string;

    @ApiProperty({ example: 'Main page', description: 'Группа блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly group: string;

}