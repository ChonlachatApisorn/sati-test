import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData, UserDocument } from './schema/user.schema';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserData.name)
    private model: Model<UserDocument>
  ) {}

  async create(dto: UserDto) {
    const checkUser = await this.model.findOne({ email: dto.email });
    if (checkUser) {
      throw new BadRequestException('User Has Already!!');
    }
    // const salt = await bcrypt.genSalt();

    return this.model.create({
      ...dto,
      password: bcrypt.hashSync(dto.password),
    });
  }

  list() {
    return this.model.find().exec();
  }

  update(id: string, dto: UserDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id, { new: true });
  }
}
