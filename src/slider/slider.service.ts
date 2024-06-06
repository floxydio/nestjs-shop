import { Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { PrismaService } from 'src/vendor/prisma/prisma.service';

@Injectable()
export class SliderService {
  constructor(private prisma: PrismaService) { }

  create(createSliderDto: CreateSliderDto) {
    return this.prisma.slider.create({
      data: {
        slider_image: createSliderDto.sliderImage
      }
    }).then((res) => {
      return {
        status: 200,
        data: res,
        message: "Slider created successfully"
      }
    }).catch((error) => {
      return {
        status: 400,
        message: "Slider not created"
      }
    })
  }

  findOneSlider() {
    return this.prisma.slider.findFirst({
      orderBy: {
        slider_id: 'desc'
      }
    }).then((res) => {
      return {
        status: 200,
        data: res || {},
        message: "Slider found successfully"
      }
    }).catch((error) => {
      return {
        status: 404,
        message: "Slider not found"
      }
    })
  }

}
