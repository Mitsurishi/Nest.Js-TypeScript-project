import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface TextBlockCreationAttrs {

    email: string;

    password: string;

}

@Table({ tableName: 'text_block' })
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs>{

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Электронная почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    search_name: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'Электронная почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    picture: string;

    @ApiProperty({ example: 'true', description: 'Статус блокировки пользователя' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'Нарушение правил', description: 'Причина блокировки' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

}//TODO ALL TEXT-BLOCK FILES