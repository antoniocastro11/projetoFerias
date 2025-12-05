import { Module } from '@nestjs/common';
import { IdeaController } from './ideas/idea.controller';
import { IdeaService } from './ideas/idea.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [IdeaController],
  providers: [IdeaService, PrismaService,],
})
export class AppModule {}
