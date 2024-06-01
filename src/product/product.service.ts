import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/vendor/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        nama: createProductDto.nama,
        quantity: String(createProductDto.quantity),
        price: Number(createProductDto.price),
        product_image: createProductDto.product_image,
        seller_id: Number(createProductDto.seller_id)
      }
    }).then((data) => {
      return {
        status: 201,
        data: data,
        message: "Product created successfully"
      }
    }).catch((error) => {
      console.log("error", error)
      return {
        status: 400,
        message: error
      }
    })
  }

  findAll() {
    return this.prisma.product.findMany().then((data) => {
      if (data.length === 0) {
        return {
          status: 404,
          message: "No product found"
        }
      } else {
        return {
          status: 200,
          data: data,
          message: "Product found successfully"
        }
      }
    })
  }

}
