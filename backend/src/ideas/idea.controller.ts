import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDto } from './dto/idea.dto';

@Controller()
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}
  

  @Post('ideas/new')
  createIdea(@Body() data: IdeaDto) {
    return this.ideaService.createIdea(data);
  }

  @Get('ideas/:id')
  getIdeaByID(@Param('id', ParseIntPipe) id: number) {
    return this.ideaService.getIdeaByID(id);
  }

  @Get('ideas')
  getAllIdeas(){
    return this.ideaService.getAllIdeas();
  }
}