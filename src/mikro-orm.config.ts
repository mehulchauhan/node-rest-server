import path from 'path';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import {
  __DB_NAME__,
  __DB_U_NAME__,
  __DB_U_PWD__,
  __PROD__,
} from './config/constants';

export default {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: __DB_NAME__,
  user: __DB_U_NAME__,
  password: __DB_U_PWD__,
  debug: !__PROD__,
  type: 'mysql',
  multipleStatements: true,
  baseDir: process.cwd(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    // tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    // transactional: true, // wrap each migration in a transaction
    // disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    // allOrNothing: true, // wrap all migrations in master transaction
    // dropTables: true, // allow to disable table dropping
    // safe: false, // allow to disable table and column dropping
    // emit: 'ts', // migration generation mode
  },
} as Options;
