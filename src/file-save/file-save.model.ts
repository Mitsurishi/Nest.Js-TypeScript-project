import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TextBlock } from "src/text-block/text-block.model";

interface FilesSaveCreationAttrs {

    essence_table: string;

    essence_id: string;

    file_name: string;

}
@Table({ tableName: 'files' })
export class Files extends Model<Files, FilesSaveCreationAttrs> {


    @ApiProperty({ example: '1', description: 'Уникальный идентификатор файла' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Some table name', description: 'Таблица где используется файл' })
    @Column({ type: DataType.STRING, allowNull: true })
    essence_table: string;

    @ApiProperty({ example: '1', description: 'Id элемента в таблице где используется файл' })
    @Column({ type: DataType.STRING, allowNull: true })
    essence_id: string;

    @ApiProperty({ example: 'Some file name', description: 'Имя файла' })
    @Column({ type: DataType.STRING, allowNull: true })
    file_name: string;

    @ApiProperty({ example: '1', description: 'Id текстового блока' })
    @ForeignKey(() => TextBlock)
    @Column({ type: DataType.INTEGER, allowNull: true })
    text_block_id: number;

    @BelongsTo(() => TextBlock)
    textBlock: TextBlock
}