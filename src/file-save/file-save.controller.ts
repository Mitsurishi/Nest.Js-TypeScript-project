import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { FilesSaveService } from './file-save.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('file-save')
export class FilesSaveController {

    constructor(private filesService: FilesSaveService,
        private jwtService: JwtService,
        private authService: AuthService) { }

    @ApiOperation({ summary: 'Удаление файлов' })
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Delete()
    deleteFiles() {
        const files = this.filesService.deleteFiles();
        return files;
    }

}