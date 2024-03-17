import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Note } from "@prisma/client";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDTO) {
    // generate password hash
    const passwordHash = await argon.hash(authDTO.password);
    // insert user into database
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: passwordHash
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        }
      })
      // return user;
      return this.signJwtToken(user.id, user.email);

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Error in credentials');
      }
    }
  }

  async login(authDTO: AuthDTO) {
    // find user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email
      }
    });

    if (!user) {
      console.log('user not found');
      throw new ForbiddenException('Email or password is incorrect');
    }
    // compare password hash
    const passwordMatched = await argon.verify(user.hashedPassword, authDTO.password);

    if (!passwordMatched) {
      console.log('password not matched');
      throw new ForbiddenException('Email or password is incorrect');
    }
    // generate JWT
    // return user;
    // return this.signJwtToken(user.id, user.email);
    return this.signJwtToken(user.id, user.email);
   
  }

  async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload: { sub: number; email: string } = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return { accessToken: jwtString };
  }

}
