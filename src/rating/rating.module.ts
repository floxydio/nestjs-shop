import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaModule } from 'src/vendor/prisma/prisma.module';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [PrismaModule],

})
export class RatingModule { }
