import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TextBlockService } from './text-block.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { CreateFilesSaveDto } from 'src/file-save/dto/create-file-save.dto';
import { FilesSaveService } from 'src/file-save/file-save.service';
import { EditTextBlockDto } from './dto/edit-text-block.dto';


@Controller('text-block')
export class TextBlockController {

    constructor(private textBlockService: TextBlockService,
        private filesSaveService: FilesSaveService) { }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createTextBlock(@Body() textBlockDto: CreateTextBlockDto, @Body() filesDto: CreateFilesSaveDto, @UploadedFile() file) {
        const textBlock = this.textBlockService.createTextBlock(textBlockDto, filesDto, file);
        return textBlock;
    }
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    getAllTBlocks() {
        const textBlocks = this.textBlockService.getAllTextBlocks();
        return textBlocks;
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get('/group/:group')
    getTblocksByGroup(@Param('group') group: string) {
        const textBlocks = this.textBlockService.getTextBlocksByGroup(group);
        return textBlocks;
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get('/search/:search_name')
    getTblockByUniqueName(@Param('search_name') search_name: string) {
        const textBlock = this.textBlockService.getTextBlockBySearchName(search_name);
        return textBlock;
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Put('/:id')
    editTextBlockById(@Param('id') text_block_id: string, @Body() editTextBlockDto: EditTextBlockDto) {
        const textBlock = this.textBlockService.editTextBlockById(text_block_id, editTextBlockDto);
        const file = this.filesSaveService.editFileByTextBlockId(text_block_id, editTextBlockDto)
        return [textBlock, file];
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteTextBlockById(@Param('id') textBlock_id: string) {
        const files = this.filesSaveService.deleteFilesByTextBlockId(textBlock_id);
        const TextBlock = this.textBlockService.deleteTextBlockById(textBlock_id);
        return [TextBlock, files];
    }

}
