const knex = require('knex') as typeof import('knex');
import type { Knex } from 'knex';

const config = require('../../knexfile');

export const db = knex(config as Knex.Config);