import { Module } from '@nestjs/common';
import { AppController } from './ideas/idea.controller';
import { AppService } from './ideas/idea.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
