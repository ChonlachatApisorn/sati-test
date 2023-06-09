import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { CurrentUser } from '../decorators/user.decorator';
import { UserData } from '../users/schema/user.schema';

@Controller('blog')
export class BlogController {
  constructor(
    private service: BlogService,
    private uploadService: UploadService
  ) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserData,
    @Body() dto: BlogDto
  ) {
    const userId = user._id.toString();
    const image = await this.uploadService.upload(file);
    dto.user_id = userId;
    dto.image = image.url;
    return this.service.create({ ...dto });
  }

  @Get('list')
  list() {
    return this.service.list();
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: BlogDto
  ) {
    if (file) {
      const image = await this.uploadService.upload(file);
      dto.image = image.url;
    }
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
