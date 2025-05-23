import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config()
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        message: error.constraints[Object.keys(error.constraints)[0]],
      }));
      return new BadRequestException(result);
    },
    stopAtFirstError: true,
  }));
  console.log(process.env.PORT_RUNNING)
  await app.listen(process.env.PORT_RUNNING);
}
bootstrap();
