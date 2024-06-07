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
        category: createProductDto.category,
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
      return {
        status: 400,
        message: error
      }
    })
  }

  findAll(category: string, nama: string) {
    return this.prisma.product.findMany({
      where: {
        category: category === undefined ? undefined : {
          contains: category
        },
        nama: nama === undefined ? undefined : {
          contains: nama
        }
      }
    }).then((data) => {
      if (data.length === 0) {
        return {
          status: 200,
          data: [],
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

  findOne(id: number) {
    return this.prisma.product.findFirst({
      where: {
        product_id: Number(id)
      }
    }).then((data) => {
      if (!data) {
        return {
          status: 404,
          message: "Product not found"
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

  findTransaction() {
    console.log("executed...")
    return this.prisma.transaction_history.findMany().then((data) => {
      return {
        status: 200,
        data: data,
        message: "Successfully Load Transaction History"
      }
    }).catch((err) => {
      return {
        status: 400,
        message: err
      }
    })
  }

}
