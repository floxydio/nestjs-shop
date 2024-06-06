import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { PrismaModule } from 'src/vendor/prisma/prisma.module';

@Module({
  controllers: [SliderController],
  providers: [SliderService],
  imports: [PrismaModule],

})
export class SliderModule { }
