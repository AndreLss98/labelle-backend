const db = require('./../configs/kenx');

const TABLE = 'servico';
const RELATION_TABLE = 'profissional_servico';

module.exports = {
    async getAll() {
        return await db(TABLE);
    },
    async getById(id) {
        return await db(TABLE).where({ id }).first();
    },
    async getType(id) {
        const proService = await db(RELATION_TABLE).where({ id }).first();
        return await db(TABLE).where({ id: proService.servico_id }).first();
    },
    async updateValues(profissional_id, servicos) {
        for (let servico of servicos) {
            const servico_id = servico.id;
            delete servico.id;
            await db(RELATION_TABLE).update(servico).where({ servico_id, profissional_id });
        }
        return true;
    },
    async registerProInService(profissional_id) {
        const services = await db.select('id').from(TABLE);
        for (let service of services) {
            await db(RELATION_TABLE).insert({ profissional_id, servico_id: service.id });
        }
    }
}