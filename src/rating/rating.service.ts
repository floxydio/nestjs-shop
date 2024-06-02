import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PrismaService } from 'src/vendor/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) { }


  async create(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({
      data: {
        rating: Number(createRatingDto.rating),
        product_id: Number(createRatingDto.productId),
        user_id: Number(createRatingDto.userId),
      }
    }).then(() => {
      return {
        status: 201,
        message: "Rating created successfully"
      }
    }).catch((err) => {
      return {
        status: 400,
        message: err
      }
    })
  }

  findOne(id: number) {
    return this.prisma.rating.findMany({
      where: {
        product_id: Number(id)
      }
    }).then((data) => {
      // count all rating
      let totalRating = 0;
      data.forEach((rating) => {
        totalRating += rating.rating;
      })

      // count average rating
      let averageRating = totalRating / data.length;

      return {
        status: 200,
        data: data,
        totalRating: totalRating,
        averageRating: averageRating,
        message: "Rating found successfully"
      }
    }).catch((err) => {
      return {
        status: 400,
        message: err
      }
    })
  }
}
