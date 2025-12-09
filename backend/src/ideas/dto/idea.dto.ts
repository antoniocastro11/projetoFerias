import { IdeaType } from "@prisma/client";
import {  IsOptional, IsString } from "class-validator";

export class IdeaDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    stack?: string;

    @IsOptional()
    ideaType?: IdeaType;

    userId: number;

}