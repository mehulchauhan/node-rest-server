import { UserStatus } from '../entities';

export interface IUserData {
  id: number;
  token: string;
  roles: string;
  status: UserStatus; // numeric enum
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  addressLine_1: string;
  addressLine_2: string;
  town: string;
  state: string;
  city: string;
  postcode: string;
  aadhar: string;
  pan: string;
  gstin: string;
}

export interface IUserRO {
  user: IUserData;
}
