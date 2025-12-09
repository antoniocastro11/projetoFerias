import { Injectable } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Idea, Prisma } from 'generated/prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IdeaDto } from './dto/idea.dto';

@Injectable()
export class  IdeaService {
  constructor(private prisma: PrismaService) {}

async createIdea(data: IdeaDto) {
  const idea = await this.prisma.idea.create({
    data
  });
  return idea;
  }

  @ApiOperation({ summary: 'Pega idea por ID' })
  async getIdeaByID(id: number): Promise<Idea | null> {
    return this.prisma.idea.findUniqueOrThrow({
      where :{ id }
    })
  } 

  @ApiOperation({ summary: 'Pega todas ideas' })
  async getAllIdeas(): Promise<Idea[]> {
    return this.prisma.idea.findMany();
  }

  @ApiOperation({ summary: 'Atualiza idea por ID' })
  async updateIdea(id:number, data: IdeaDto): Promise<Idea> {
    return this.prisma.idea.update({
      where: { id },
      data,
    });
  }

  
}
  