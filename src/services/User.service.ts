import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { IUserRO } from '../interfaces';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { wrap } from '@mikro-orm/core';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/constants';

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        email: user.email,
        exp: exp.getTime() / 1000,
        id: user.id,
      },
      SECRET,
    );
  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      token: this.generateJWT(user),

      roles: user.roles,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      profilePicture: user.profilePicture,
      addressLine_1: user.addressLine_1,
      addressLine_2: user.addressLine_2,
      town: user.town,
      state: user.state,
      city: user.city,
      postcode: user.postcode,
      aadhar: user.aadhar,
      pan: user.pan,
      gstin: user.gstin,
    };

    return { user: userRO };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(loginUserDto: LoginUserDto): Promise<User> {
    const findOneOptions = {
      email: loginUserDto.email,
      password: loginUserDto.password,
    };

    return this.userRepository.findOne(findOneOptions);
  }

  async create(dto: CreateUserDto): Promise<IUserRO> {
    const {
      roles,
      status,
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      addressLine_1,
      addressLine_2,
      town,
      state,
      city,
      postcode,
      aadhar,
      pan,
      gstin,
    } = dto;

    // check uniqueness of username/email
    const exists = await this.userRepository.count({ $or: [{ email }] });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { email: 'Email must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const user = new User(
      roles,
      status,
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      addressLine_1,
      addressLine_2,
      town,
      state,
      city,
      postcode,
      aadhar,
      pan,
      gstin,
    );
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.userRepository.persistAndFlush(user);
      return this.buildUserRO(user);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    wrap(user).assign(dto);
    await this.userRepository.flush();

    return this.buildUserRO(user);
  }

  async delete(email: string) {
    return this.userRepository.remove({ email });
  }

  async findById(id: number): Promise<IUserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<IUserRO> {
    const user = await this.userRepository.findOneOrFail({ email });
    return this.buildUserRO(user);
  }
}
