import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProfileCreationAttrs {

    name: string;

    surname: string;

    phone: string;

}

@Table({ tableName: 'profile' })
export class Profile extends Model<Profile, ProfileCreationAttrs>{

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    @Column({ type: DataType.STRING })
    surname: string;

    @ApiProperty({ example: '79102223344', description: 'Номер телефона пользователя' })
    @Column({ type: DataType.STRING })
    phone: string;

    @BelongsTo(() => User)
    user: User;

}