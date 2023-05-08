import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema } from '../../common/base.schema';
import { UserData } from '../../users/schema/user.schema';

export type BlogDocument = BlogData & Document;

@Schema({ timestamps: true })
export class BlogData extends BaseSchema {
  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'UserData' })
  user_id: UserData | Types.ObjectId;
}
export const BlogSchema = SchemaFactory.createForClass(BlogData);
