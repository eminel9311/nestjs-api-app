import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // this model is available globally (across all modules
@Module({
  providers: [
    PrismaService
  ],
  exports: [
    PrismaService
  ], // other modules can use the PrismaService
})
export class PrismaModule {}
