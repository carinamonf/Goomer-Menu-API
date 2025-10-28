import type { Knex } from 'knex';
const { join } = require('path'); 

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'goomermenu',
    password: 'db1q2w3e4r',
    database: 'goomer_menu',
  },
  migrations: {
    extension: 'ts',
    directory: join(__dirname, 'src/database/migrations'),
  },
  seeds: {
    extension: 'ts',
    directory: join(__dirname, 'src/database/seeds'),
  }
};

module.exports = config;