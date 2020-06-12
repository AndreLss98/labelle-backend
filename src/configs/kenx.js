const { DB, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const CONFIG = {
    client: 'mysql',
    connection: {
        database: DB,
        user: DB_USER,
        password: DB_PASSWORD
    }
}

const knex = require('knex')(CONFIG);
module.exports = knex;
