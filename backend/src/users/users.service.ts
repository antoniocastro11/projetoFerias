import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

        getUserById(id: number){
            return this.prisma.user.findUnique({
                where: { id },
                select:{
                    email: true,
                    id: true,
                    name: true
                }
            });
        }

        updateUser(id: number, data: any){
            return this.prisma.user.update({
                where: {id},
                data,
            })
        }

    }

