import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Delete,
  UsePipes,
  Param,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto';
import { UserDecorator } from '../decorators';
import { IUserRO } from '../interfaces';
import { UserService } from '../services';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('user')
  async findMe(@UserDecorator('email') email: string): Promise<IUserRO> {
    return this.userService.findByEmail(email);
  }

  @Put('user')
  async update(
    @UserDecorator('id') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  async delete(@Param() params) {
    return this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!foundUser) {
      throw new HttpException({ errors }, 401);
    }
    const token = await this.userService.generateJWT(foundUser);
    // const { email } = foundUser;
    const user = { token, ...foundUser };
    return { user };
  }
}
