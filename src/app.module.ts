import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RatingModule } from './rating/rating.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SliderModule } from './slider/slider.module';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '')

        }),
        CacheModule.register(),
        ConfigModule.forRoot(),

        AuthModule, ProductModule, RatingModule, SliderModule],
})
export class AppModule { }