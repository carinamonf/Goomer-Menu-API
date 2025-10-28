import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    client: "pg",
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'goomermenu',
      password: 'db1q2w3e4r',
      database: 'goomer_menu',
    },

    migrations: {
      extension: 'ts',
      directory: './src/database/migrations',
    },

    seeds: {
      extension: 'ts',
      directory: './src/database/seeds',
    }
};

export default config;