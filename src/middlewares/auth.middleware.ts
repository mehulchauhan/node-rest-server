import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'connect';

import jwt from 'jsonwebtoken';
import { IUserData } from 'src/interfaces';
import { SECRET } from '../config/constants';
import { UserService } from '../services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  async use(
    req: { headers: { authorization: any }; user: IUserData },
    res: any,
    next: NextFunction,
  ) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user.user;
      req.user.id = decoded.id;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
