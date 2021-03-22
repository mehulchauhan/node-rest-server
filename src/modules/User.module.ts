import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from '../middlewares';
import { UserController } from '../controllers';
import { User } from '../entities';
import { UserService } from '../services';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT },
      );
  }
}
