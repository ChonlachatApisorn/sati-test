import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private service: BlogService) {}

  @Post('create')
  create(@Body() dto: BlogDto) {
    return this.service.create(dto);
  }

  @Get('list')
  list() {
    return this.service.list();
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
