const db = require('./../configs/knex');

const TABLE = 'cliente';

module.exports = {
    async getById(id) {
        return await db(TABLE).where({ id }).first();
    },
    async getByEmail(email) {
        return await db(TABLE).where({ email }).first();
    }
}