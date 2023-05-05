import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogData, BlogSchema } from './schema/blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogData.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, UploadService],
})
export class BlogModule {}
