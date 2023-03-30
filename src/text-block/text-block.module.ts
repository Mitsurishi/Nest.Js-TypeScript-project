import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Files } from 'src/file-save/file-save.model';
import { FilesSaveModule } from 'src/file-save/file-save.module';
import { FilesSaveService } from 'src/file-save/file-save.service';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { TextBlockController } from './text-block.controller';
import { TextBlock } from './text-block.model';
import { TextBlockService } from './text-block.service';

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService, FilesSaveService, FilesService],
  imports: [
    SequelizeModule.forFeature([TextBlock, Files]),
    AuthModule,
    FilesSaveModule,
    FilesModule
  ]
})
export class TextBlockModule { }
