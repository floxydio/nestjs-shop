import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/vendor/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  create(createAuthDto: CreateAuthDto) {
    const saltRound = 10
    const hash = bcrypt.hashSync(createAuthDto.password, saltRound)
    createAuthDto.password = hash

    return this.prisma.users.create({
      data: {
        name: createAuthDto.name,
        email: createAuthDto.email,
        password: createAuthDto.password
      }
    })
  }

  signIn(email: string, password: string) {
    return this.prisma.users.findUnique({
      where: {
        email: email
      }
    }).then(async (user) => {
      if (!user) {
        return {
          status: 400,
          message: "User not found"
        }
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: 400,
          message: "Username or Password is incorrect"
        }
      } else {
        return {
          status: 200,
          access_token: await this.jwtService.signAsync({ id: user.id, email: user.email, name: user.name }),
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          message: "User logged in successfully"
        }
      }

    }).catch((error) => {
      return {
        status: 500,
        message: "Internal server error"
      }
    })
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id: id
      },
    }).then((user) => {
      if (!user) {
        return {
          status: 400,
          message: "User not found"
        }
      } else {
        return {
          status: 200,
          data: user
        }
      }
    }).catch((error) => {
      return {
        status: 500,
        message: "Internal server error"
      }
    })
  }
}
