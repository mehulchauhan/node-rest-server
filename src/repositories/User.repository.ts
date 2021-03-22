import { EntityRepository, Repository } from '@mikro-orm/core';
import { User } from '../entities';

@Repository(User)
export class UserRepository extends EntityRepository<User> { }
