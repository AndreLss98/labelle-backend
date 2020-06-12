const db = require('./../configs/kenx');

const SUB_TABLE = 'local';
const TABLE = 'profissional';

const Servico = require('./../repositorys/servico');

module.exports = {
    async getById(id) {
        return await db(TABLE).where({ id }).first();
    },
    async getByEmail(email) {
        return await db(TABLE).where({ email }).first();
    },
    async save(profissional) {
        try {
            const id = await db(TABLE).insert(profissional);
            await Servico.registerProInService(id[0]);
            return await db(TABLE).where({ id: id[0] }).first();
        } catch(error) {
            throw error;
        }
    },
    async saveLocal(local) {
        try {
            return await db(SUB_TABLE).insert(local);
        } catch(error) {
            throw error;
        }
    },
    async getLocal(profissional_id) {
        return db(SUB_TABLE).where({ profissional_id }).first();
    }
}