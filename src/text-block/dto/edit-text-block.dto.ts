import { IsOptional } from "class-validator";

export class EditTextBlockDto {

    readonly search_name: string;

    readonly name: string;

    readonly file: string;

    readonly text: string;

    readonly group: string;

    @IsOptional()
    readonly essence_table: string;

    @IsOptional()
    readonly essence_id: string;
}