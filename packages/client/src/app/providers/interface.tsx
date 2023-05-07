import { Types } from 'mongoose';

export interface IAuthContext {
  user: boolean;
  setUser: (user: boolean) => void;
}

export interface IBlog {
  description: string;
  image: string;
  user_id: {
    _id: Types.ObjectId;
    profile_image: string;
    first_name: string;
    last_name: string;
  };
}
