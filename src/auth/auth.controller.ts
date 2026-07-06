import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.usersService.findOne(body.username);
    if (user && user.password === body.password) {
      // password matches
      return {
        message: 'Login successful',
        user: {
          username: user.username,
          role: user.role,
        },
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
