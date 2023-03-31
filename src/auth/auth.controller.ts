import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
        return this.authService.registration(userDto, profileDto);
    }

}
