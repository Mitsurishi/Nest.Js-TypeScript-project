import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFilesSaveDto {

    @ApiProperty({ example: 'Some table name', description: 'Таблица где используется файл' })
    @IsString({ message: 'Должно быть строкой' })
    readonly essence_table: string;

    @ApiProperty({ example: '1', description: 'Id элемента в таблице где используется файл' })
    @IsString({ message: 'Должно быть строкой' })
    readonly essence_id: string;

    @ApiProperty({ example: '1', description: 'Id текстового блока' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly text_block_id: number;

}