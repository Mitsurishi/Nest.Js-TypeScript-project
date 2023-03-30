import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { CreateFilesSaveDto } from 'src/file-save/dto/create-file-save.dto';
import { FilesSaveService } from 'src/file-save/file-save.service';
import { TextBlock } from './text-block.model';

@Injectable()
export class TextBlockService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
        private fileService: FilesSaveService) { }

    async createTextBlock(textBlockDto: CreateTextBlockDto, fileDto: CreateFilesSaveDto, fileName_file: any) {
        const textBlock = await this.textBlockRepository.create(textBlockDto);
        const file = await this.fileService.createFile(fileDto, fileName_file);
        return [textBlock, file];
    }

    async getAllTextBlocks() {
        const textBlocks = await this.textBlockRepository.findAll({ include: { all: true } });
        return textBlocks;
    }

    async getTextBlocksByGroup(group: string) {
        const textBlocks = await this.textBlockRepository.findAll({ where: { group: group } });
        return textBlocks;
    }

    async getTextBlockBySearchName(search_name: string) {
        const textBlock = await this.textBlockRepository.findOne({ where: { search_name }, include: { all: true } });
        return textBlock;
    }

    async deleteTextBlockById(text_block_id: string) {
        const textBlock = await this.textBlockRepository.destroy({ where: { id: text_block_id } });
        return textBlock;
    }

    async editTextBlockById(text_block_id: string, textBlockDto: CreateTextBlockDto) {
        const textBlock = await this.textBlockRepository.update(
            { search_name: textBlockDto.search_name, name: textBlockDto.name, file: textBlockDto.file, text: textBlockDto.text, group: textBlockDto.group },
            { where: { id: text_block_id } }
        );
        return textBlock;
    }

}