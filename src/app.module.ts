import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import * as path from "path";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { TextBlockModule } from './text-block/text-block.module';
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { FilesSaveModule } from "./file-save/file-save.module";
import { FilesModule } from "./files/files.module";
import { Profile } from "./profile/profile.model";
import { TextBlock } from "./text-block/text-block.model";
import { Files } from "./file-save/file-save.model";


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Profile, TextBlock, Files],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TextBlockModule,
        ProfileModule,
        FilesSaveModule,
        FilesModule
    ]
})

export class AppModule { }