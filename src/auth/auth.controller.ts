import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
        return this.authService.registration(userDto, profileDto);
    }

}
