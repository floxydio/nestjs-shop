import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt/jwt-authguard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  create(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    return this.authService.create(createAuthDto).then((data) => {
      return res.status(201).json("User created successfully")
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }

  @Post("login")
  signIn(@Body() body: SignInDto, @Res() res: Response) {
    return this.authService.signIn(body.email, body.password).then((data) => {
      return res.status(data.status).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }

  @Get("find-profile/:id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.authService.findOne(+id).then((data) => {
      return res.status(200).json(data)
    }).catch((error) => {
      return res.status(400).json(error)
    });
  }
}
