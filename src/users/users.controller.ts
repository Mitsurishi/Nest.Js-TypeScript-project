import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { JwtService } from "@nestjs/jwt";
import { ProfileService } from 'src/profile/profile.service';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
        private profileService: ProfileService,
        private authService: AuthService,
        private jwtService: JwtService) { }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
        const user = this.usersService.createUser(userDto, profileDto);
        return user;
    }

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Присвоить роль' })
    @ApiResponse({ status: 200 })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Заблокировать пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Delete("/delete/:id")
    deleteUserById(@Param("id") userId: number) {
        return this.usersService.deleteUserById(userId);
    }
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Put("/edit/:id")
    editProfileById(@Param('id') userId: number, @Body() profileDto: CreateProfileDto) {
        return this.profileService.editProfileByUserId(userId, profileDto);
    }

    @Roles('User')
    @UseGuards(RolesGuard)
    @Put('/edit')
    editProfile(@Req() req: Request, @Body() profileDto: CreateProfileDto) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const user = this.jwtService.verify(token);
        return this.profileService.editProfileByUserId(user.id, profileDto);
    }

    @Roles('User')
    @UseGuards(RolesGuard)
    @Delete('/delete')
    deleteProfile(@Req() req: Request) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const user = this.jwtService.verify(token);
        return this.usersService.deleteUserById(user.id);
    }

}
