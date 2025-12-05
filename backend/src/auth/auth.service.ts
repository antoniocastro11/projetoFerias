import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ){}


    async register(data: any){
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed
                },
            });
            return {message: 'Usuário registrado com sucesso', userId: user.id};
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user){
            throw new UnauthorizedException('Credenciais inválidas');

        }

        const match = await bcrypt.compare(password, user.password);
        if (!match){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const tokens = await this.generateTokens(user.id, user.email);

        await this.updateRefreshToken(user.id, tokens.refreshToken);
        
        return tokens;
    }

    async logout(userId: number){
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    }

    async refreshToken(userId: number, refreshToken: string){
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.refreshToken){
            throw new UnauthorizedException();
        }
        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid){
            throw new UnauthorizedException();
        }
        const tokens = await this.generateTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async generateTokens(userId: number, email: string){
        const payload = { sub: userId, email };
        const accessToken = this.jwt.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwt.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: number, refreshToken: string){
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: hashed },
        });
    }
}
