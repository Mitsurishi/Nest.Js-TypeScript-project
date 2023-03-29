import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Module({

    providers: [ProfileService, UsersService, RolesService],

    controllers: [],

    imports: [
        SequelizeModule.forFeature([User, Profile, Role]),
        forwardRef(() => UsersModule),
        RolesModule
    ],
    exports: [
        ProfileService
    ]
})

export class ProfileModule { }
