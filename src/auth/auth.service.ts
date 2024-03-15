import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Note } from "@prisma/client";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService
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
      return user;
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
    return user;
   
  }

}
