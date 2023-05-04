import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }

  @Get('list')
  list() {
    return this.service.list();
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
