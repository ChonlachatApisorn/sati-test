import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogData, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogData.name)
    private model: Model<BlogDocument>
  ) {}

  test() {
    return 'test';
  }
}
