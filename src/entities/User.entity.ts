import { EntityRepositoryType, Entity, Enum, Property } from '@mikro-orm/core';

import { IsEmail } from 'class-validator';
import { UserRepository } from '../repositories';
// import { ArrayToJson } from "../entityTypes/ArrayToJson";
import { BaseEntity } from './Base.entity';

enum UserRole {
  ROOT = 'ROOT',
  OWNER = 'OWNER',
  DEALER = 'DEALER',
  STAFF = 'STAFF',
  PUBLIC = 'PUBLIC',
}

export const enum UserStatus {
  DISABLED,
  ACTIVE,
}

@Entity()
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  // @Enum({ items: () => UserRole, array: true, default: [UserRole.PUBLIC] })
  // roles: UserRole[] = [UserRole.PUBLIC];

  @Property({ type: 'string', default: UserRole.PUBLIC, length: 100 })
  roles: string;

  // @Property({ type: ArrayToJson, default: UserRole.PUBLIC })
  // roles!: ArrayToJson;

  @Enum()
  status: UserStatus; // numeric enum

  @Property({ type: 'string' })
  firstName: string;

  @Property({ type: 'string' })
  lastName: string;

  @Property({ type: 'string', unique: true, length: 255 })
  @IsEmail()
  email: string;

  @Property({ type: 'string', hidden: true })
  password: string;

  @Property({ type: 'string', length: 32 })
  profilePicture: string;

  @Property({ type: 'string', length: 100, nullable: true })
  addressLine_1: string;

  @Property({ type: 'string', length: 100, nullable: true })
  addressLine_2: string;

  @Property({ type: 'string', length: 16 })
  town: string;

  @Property({ type: 'string', length: 16 })
  state: string;

  @Property({ type: 'string', length: 16 })
  city: string;

  @Property({ type: 'string', length: 16 })
  postcode: string;

  @Property({ type: 'string', length: 16, nullable: true })
  aadhar: string;

  @Property({ type: 'string', length: 16, nullable: true })
  pan: string;

  @Property({ type: 'string', length: 16, nullable: true })
  gstin: string;

  @Property({ persist: false })
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Property({ persist: false })
  get fullAddress() {
    return `${this.addressLine_1}, ${this.addressLine_2}, ${this.town}, ${this.state}, ${this.city}, ${this.postcode}`;
  }

  constructor(
    roles: string,
    status: UserStatus,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profilePicture: string,
    addressLine_1: string,
    addressLine_2: string,
    town: string,
    state: string,
    city: string,
    postcode: string,
    aadhar: string,
    pan: string,
    gstin: string,
  ) {
    super();
    this.roles = roles;
    this.status = status;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.profilePicture = profilePicture;
    this.addressLine_1 = addressLine_1;
    this.addressLine_2 = addressLine_2;
    this.town = town;
    this.state = state;
    this.city = city;
    this.postcode = postcode;
    this.aadhar = aadhar;
    this.pan = pan;
    this.gstin = gstin;
  }
}
