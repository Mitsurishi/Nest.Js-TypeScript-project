import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { Op } from "sequelize";
import { Files } from './file-save.model';
import { CreateFilesSaveDto } from './dto/create-file-save.dto';
import { EditTextBlockDto } from 'src/text-block/dto/edit-text-block.dto';

@Injectable()
export class FilesSaveService {

    constructor(@InjectModel(Files) private filesRepository: typeof Files,
        private filesService: FilesService) { }

    async createFile(fileDto: CreateFilesSaveDto, fileName_file: any) {
        const fileName = await this.filesService.createFile(fileName_file);
        const file = await this.filesRepository.create({ ...fileDto, file_name: fileName });
        return file;
    }

    async deleteFilesByTextBlockId(textBlockId) {
        const files = await this.filesRepository.destroy({ where: { text_block_id: textBlockId } });
        return files;
    }

    async deleteFiles() {
        const filesNoUse = await this.filesRepository.destroy({ where: { essence_table: '', essence_id: '' } || { essence_table: null, essence_id: null } });
        const filesExpired = await this.filesRepository.destroy({
            where: {
                createdAt:
                    { [Op.lte]: new Date(Date.now() - (60 * 60 * 1000)) }
            }
        });
        return [filesNoUse, filesExpired];
    }

    async editFileByTextBlockId(textBlockId, editTextBlockDto: EditTextBlockDto) {
        const file = await this.filesRepository.update(
            { essence_id: editTextBlockDto.essence_id, essence_table: editTextBlockDto.essence_table },
            { where: { text_block_id: textBlockId } }
        )
        return file;
    }

}