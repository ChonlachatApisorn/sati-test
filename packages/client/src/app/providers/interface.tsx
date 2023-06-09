import { Types } from 'mongoose';

export interface IAuthContext {
  user: boolean;
  setUser: (user: boolean) => void;
  data: {
    _id: string;
    profile_image: string;
    first_name: string;
    last_name: string;
  };
}

export interface IBlog {
  _id: Types.ObjectId;
  description: string;
  image: string;
  user_id: {
    _id: Types.ObjectId;
    profile_image: string;
    first_name: string;
    last_name: string;
  };
}
