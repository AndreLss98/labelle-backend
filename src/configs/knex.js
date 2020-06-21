const CONFIG = require('./knexfile');

const knex = require('knex')(CONFIG);
module.exports = knex;
