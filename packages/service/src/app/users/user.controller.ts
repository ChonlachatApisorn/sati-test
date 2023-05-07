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
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { UploadService } from '../upload/upload.service';
import { CurrentUser } from '../decorators/user.decorator';
import { UserData } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private service: UserService,
    private uploadService: UploadService
  ) {}

  @Post('create')
  create(@Body() dto: UserDto) {
    return this.service.create(dto);
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
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('profile_image'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() dto: UserDto
  ) {
    if (file) {
      const image = await this.uploadService.upload(file);
      dto.profile_image = image.url;
    }
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @UseGuards(JwtGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserData
  ) {
    const userId = user._id.toString();
    const image = await this.uploadService.upload(file);
    await this.service.updatePathImage(userId, image.url);
    return image.url;
  }
}
