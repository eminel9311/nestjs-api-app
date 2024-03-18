import { Controller, Get, UseGuards,Req } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';

@UseGuards(MyJwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
