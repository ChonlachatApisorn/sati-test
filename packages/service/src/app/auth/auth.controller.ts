import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { UserData } from '../users/schema/user.schema';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() dto: UserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Email not found!!');
    }
    const validate = await this.authService.validateUser(
      dto.email,
      dto.password
    );
    if (!validate) {
      throw new UnauthorizedException('Password is incorrect!!');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('get-current-user')
  getCurrentUser(@CurrentUser() user: UserData) {
    return user;
  }
}
