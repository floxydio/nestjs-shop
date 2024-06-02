import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { JwtAuthGuard } from 'src/auth/jwt/jwt-authguard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        const filename: string = file.originalname.split('.')[0]
        const fileExtName: string = file.originalname.split('.')[1]
        cb(null, `${filename}-${Date.now()}.${fileExtName}`)
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
  create(@Body() createProductDto: CreateProductDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      createProductDto.product_image = file.filename
    }
    return this.productService.create(createProductDto).then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @CacheKey('products')
  @CacheTTL(60)
  findAll(@Res() res: Response) {
    return this.productService.findAll().then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }

  @Get("detail/:id")
  @UseGuards(JwtAuthGuard)
  @CacheKey('product_id')
  @CacheTTL(60)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.productService.findOne(+id).then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }


}
