const db = require('./../configs/kenx');

const SUB_TABLE_LOCAL = 'local';
const SUB_TABLE_DISPONIBILIDADE = 'disponibilidade';
const SUB_TABLE_SERVICOS = 'profissional_servico';
const TABLE = 'profissional';

const Servico = require('./../repositorys/servico');

module.exports = {
    async getAll() {
        return await db(TABLE);
    },
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
            return await db(SUB_TABLE_LOCAL).insert(local);
        } catch(error) {
            throw error;
        }
    },
    async saveDisponibilidade(disponibilidade) {
        try {
            return await db(SUB_TABLE_DISPONIBILIDADE).insert(disponibilidade);
        } catch(error) {
            throw error;
        }
    },
    async getLocal(profissional_id) {
        return db(SUB_TABLE_LOCAL).where({ profissional_id }).first();
    },
    async getDisponibilidade(profissional_id) {
        return db(SUB_TABLE_DISPONIBILIDADE).where({ profissional_id }).first();
    },
    async getAllServices(profissional_id) {
        return await db(SUB_TABLE_SERVICOS).where({ profissional_id });
    }
}