import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Files } from "src/file-save/file-save.model";


interface TextBlockCreationAttrs {

    search_name: string;

    name: string;

    file: string;

    text: string;

    group: string;

}

@Table({ tableName: 'text_block' })
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs>{

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Main hero text', description: 'Уникальное имя для поиска' })
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    search_name: string;

    @ApiProperty({ example: 'Text block name', description: 'Название блока' })
    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @ApiProperty({ example: 'picture.jpg', description: 'Имя файла' })
    @Column({ type: DataType.STRING, allowNull: true })
    file: string;

    @ApiProperty({ example: 'Some text', description: 'Текст блока' })
    @Column({ type: DataType.STRING, allowNull: true })
    text: string;

    @ApiProperty({ example: 'Main page text', description: 'Группа текстового блока' })
    @Column({ type: DataType.STRING, allowNull: true })
    group: string;

    @ApiProperty({ description: 'Файлы текстового блока', type: [Files] })
    @HasMany(() => Files)
    Files: Files[];

}