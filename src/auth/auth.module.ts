import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'
import { PrismaModule } from 'src/vendor/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: "secretKey1!",
    signOptions: { expiresIn: '1d' }
  }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
})
export class AuthModule { }
