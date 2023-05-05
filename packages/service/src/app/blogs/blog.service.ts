import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogData, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogData.name)
    private model: Model<BlogDocument>
  ) {}

  create(dto: BlogDto) {
    return this.model.create(dto);
  }

  list() {
    return this.model.find().exec();
  }

  update(id: string, dto: BlogDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
