import knex from 'knex';
import { v4 as uuid } from 'uuid';

import Env from '../utils/Env';

const connection = knex({
  client: 'mysql',
  connection: new Env().databaseURL,
});

connection.schema.dropTableIfExists('user');
connection.schema.createTableIfNotExists('user', (table) => {
  table.uuid('id').primary().defaultTo(uuid());
  table.string('name').notNullable();
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
  table.timestamps(true, true, true).defaultTo(new Date());
});

export default connection;
