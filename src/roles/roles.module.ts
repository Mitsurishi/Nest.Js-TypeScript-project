import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  controllers: [RolesController],

  providers: [RolesService],

  imports: [SequelizeModule.forFeature([Role, User, UserRoles]),
    AuthModule],

  exports: [RolesService]

})
export class RolesModule { }
