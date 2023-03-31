import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { TextBlock } from 'src/text-block/text-block.model';
import { TextBlockService } from 'src/text-block/text-block.service';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    // constructor(@InjectModel(TextBlock) private textBlockService: TextBlockService) { }

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (error) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*  async deleteFile(textBlockId): Promise<string> {
           const textBlock = await this.textBlockService.getTextBlockById(textBlockId)
           const fileName = textBlock.file;
           const filePath = path.resolve(__dirname, '..', `static/${fileName}`);
   
           fs.unlink(filePath, (error) => {
               if (error) throw error;
           })
           return fileName + ` ${fileName} from textblock ${textBlock.id} was deleted`
       }
   */ // удаление статики
}