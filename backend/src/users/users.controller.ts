import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

        @UseGuards(JwtAuthGuard)
        @Get('perfil/:id')
        getUserById(@Param('id', ParseIntPipe) id: number) {
            return this.usersService.getUserById(id);
        }
        
        @UseGuards(JwtAuthGuard)
        @Post('perfil/update/:id')
        updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
            return this.usersService.updateUser(id, data);
        }
}
