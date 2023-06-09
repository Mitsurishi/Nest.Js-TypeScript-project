import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService) { }

    async createProfile(profileDto: CreateProfileDto, userDto: CreateUserDto) {
        const profile = await this.profileRepository.create(profileDto);
        const user = await this.usersService.getUserByEmail(userDto.email);
        await profile.update({ userId: user.id });
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll({ include: { all: true } });
        return profiles;
    }

    async editProfileByUserId(userId: number, profileDto: CreateProfileDto) {
        const user_Id = userId
        const profile = await this.profileRepository.update(profileDto, { where: { userId: user_Id } })
        return profile;
    }


}
