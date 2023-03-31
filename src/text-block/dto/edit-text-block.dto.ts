import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditTextBlockDto {

    @ApiProperty({ example: 'main-hero-text', description: 'Уникальное название для поиска' })
    @IsString({ message: 'Должно быть строкой' })
    readonly search_name: string;

    @ApiProperty({ example: 'Some name', description: 'Название текстового блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;

    @ApiProperty({ example: '/somepath/file.jpg', description: 'Путь до файла прикреплённого к блоку' })
    @IsString({ message: 'Должно быть строкой' })
    readonly file: string;

    @ApiProperty({ example: 'Some text', description: 'Текст блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly text: string;

    @ApiProperty({ example: 'Main page', description: 'Группа блока' })
    @IsString({ message: 'Должно быть строкой' })
    readonly group: string;

    @ApiProperty({ example: 'Some table', description: 'Таблица где используется файл' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    readonly essence_table: string;

    @ApiProperty({ example: '1', description: 'Id элемента в таблице где используется файл' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    readonly essence_id: string;
}