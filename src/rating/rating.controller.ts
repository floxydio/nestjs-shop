import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-authguard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';


@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  create(@Body() createRatingDto: CreateRatingDto, @Res() res: Response) {
    return this.ratingService.create(createRatingDto).then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }


  @Get('detail/:id')
  @CacheKey('rating')
  @CacheTTL(60)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.ratingService.findOne(+id).then((data) => {
      return res.status(data.status).json(data)
    }).catch((err) => {
      return res.status(400).json(err)
    });
  }

}
