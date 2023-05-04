import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../common/base.schema';

export type UserDocument = UserData & Document;

@Schema({ timestamps: true })
export class UserData extends BaseSchema {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  date_of_birth: string;

  @Prop()
  profile_image: string;
}
export const UserSchema = SchemaFactory.createForClass(UserData);
