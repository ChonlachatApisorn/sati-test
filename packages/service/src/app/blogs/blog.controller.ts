import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private service: BlogService) {}

  @Get('test')
  test() {
    return this.service.test();
  }
}
