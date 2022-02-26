import knex from 'knex';

import Env from '../utils/Env';

export default knex({
  client: 'mysql',
  connection: new Env().databaseURL,
});
