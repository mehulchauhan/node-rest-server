import { IsNotEmpty } from 'class-validator';
import { UserStatus } from '../entities';

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly roles: string;

  @IsNotEmpty()
  readonly status: UserStatus; // numeric enum

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly profilePicture: string;

  @IsNotEmpty()
  readonly addressLine_1: string;

  @IsNotEmpty()
  readonly addressLine_2: string;

  @IsNotEmpty()
  readonly town: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly postcode: string;

  @IsNotEmpty()
  readonly aadhar: string;

  @IsNotEmpty()
  readonly pan: string;

  @IsNotEmpty()
  readonly gstin: string;
}

export class UpdateUserDto {
  readonly roles: string;
  readonly status: UserStatus;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly profilePicture: string;
  readonly addressLine_1: string;
  readonly addressLine_2: string;
  readonly town: string;
  readonly state: string;
  readonly city: string;
  readonly postcode: string;
  readonly aadhar: string;
  readonly pan: string;
  readonly gstin: string;
}