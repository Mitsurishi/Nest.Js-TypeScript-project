import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TextBlock } from "src/text-block/text-block.model";

interface FilesSaveCreationAttrs {

    essence_table: string;

    essence_id: string;

    file_name: string;

}
@Table({ tableName: 'files' })
export class Files extends Model<Files, FilesSaveCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    essence_table: string;

    @Column({ type: DataType.STRING, allowNull: true })
    essence_id: string;

    @Column({ type: DataType.STRING })
    file_name: string;

    @ForeignKey(() => TextBlock)
    @Column({ type: DataType.INTEGER })
    text_block_id: number;

    @BelongsTo(() => TextBlock)
    TextBlock: TextBlock
}