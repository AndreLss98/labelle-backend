// Update with your config settings.
const { DB, DB_HOST, DB_USER, DB_PASSWORD } = require('./../../.db-env');

module.exports = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    database: DB,
    user: DB_USER,
    password: DB_PASSWORD
  }
};
