import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/profile/profile.model';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({

  controllers: [UsersController],

  providers: [UsersService, ProfileService],

  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
    RolesModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => AuthModule)
  ],

  exports: [UsersService]

})

export class UsersModule { }
