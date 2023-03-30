import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "../files/files.module";
import { FilesService } from "../files/files.service";
import { AuthModule } from "../auth/auth.module";
import { FilesSaveService } from './file-save.service';
import { Files } from './file-save.model';
import { TextBlock } from 'src/text-block/text-block.model';
import { FilesSaveController } from './file-save.controller';

@Module({
    providers: [FilesSaveService, FilesService],
    imports: [SequelizeModule.forFeature([Files, TextBlock]), FilesModule, AuthModule],
    exports: [FilesSaveService],
    controllers: [FilesSaveController]
})
export class FilesSaveModule { }