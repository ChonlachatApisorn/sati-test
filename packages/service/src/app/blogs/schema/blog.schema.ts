import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../common/base.schema';

export type BlogDocument = BlogData & Document;

@Schema({ timestamps: true })
export class BlogData extends BaseSchema {
  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  user_id: string;
}
export const BlogSchema = SchemaFactory.createForClass(BlogData);
