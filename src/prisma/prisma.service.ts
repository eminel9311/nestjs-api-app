import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: { 
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
       },
    });
    console.log('db url:', configService.get<string>('DATABASE_URL'));
  }

  // notice: only run this function in test environment
  clearDatabase() {
    console.log('Clearing database');
    return this.$transaction([
      this.note.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
