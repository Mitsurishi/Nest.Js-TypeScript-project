import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profile/profile.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {

    email: string;

    password: string;

}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Электронная почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'Статус блокировки пользователя' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'Нарушение правил', description: 'Причина блокировки' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @HasOne(() => Profile)
    profile: Profile;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

}