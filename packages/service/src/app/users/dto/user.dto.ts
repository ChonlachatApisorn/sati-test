export class UserDto {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  date_of_birth: string;
  profile_image: string;
}

export class ChangePassword {
  old: string;
  new: string;
}
