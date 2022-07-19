const config = require('config');

const knex = require('knex')({
  client: 'pg',
  connection: config.get('database'),
});

module.exports = knex;
