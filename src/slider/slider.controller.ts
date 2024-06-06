import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-authguard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { Response } from 'express';


@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) { }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage/slider',
      filename: (req, file, cb) => {
        const filename: string = file.originalname.split('.')[0]
        const fileExtName: string = file.originalname.split('.')[1]
        // generate 10 random characters
        const randomName = Array(10)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('')
        cb(null, `${randomName}.${fileExtName}`)
      }
    }),
    limits: {
      fileSize: 4 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true)
      } else {
        cb(new Error('Only image files are allowed!'), false)
      }
    }
  }))
  create(@Body() createSliderDto: CreateSliderDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      createSliderDto.sliderImage = file.filename
    }
    return this.sliderService.create(createSliderDto).then((data) => {
      return res.status(data.status).json(data)
    }).catch((err) => {
      return res.status(400).json(err)
    });
  }

  @Get()
  findOneSlider(@Res() res: Response) {
    return this.sliderService.findOneSlider().then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }

}
