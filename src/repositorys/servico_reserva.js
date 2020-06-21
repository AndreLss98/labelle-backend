const db = require('./../configs/knex');
const TABLE = 'servico_reserva';

module.exports = {
    async getAll() {
        return await db(TABLE);
    },
    async getAllByReserva(reserva_id) {
        return await db(TABLE).where({ reserva_id });
    },
    async save(reserva) {
        try {
            return await db(TABLE).insert(reserva);
        } catch(error) {
            throw error;
        }
    }
}