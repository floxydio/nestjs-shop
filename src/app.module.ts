import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RatingModule } from './rating/rating.module';

@Module({
    imports: [
        CacheModule.register(),
        AuthModule, ProductModule, RatingModule],
})
export class AppModule { }