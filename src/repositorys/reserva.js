const db = require('./../configs/kenx');

const TABLE = 'reserva';

module.exports = {
    async getAllByClienteId(cliente_id) {
        return await db(TABLE).where({ cliente_id });
    },
    async save(reserva) {
        try {
            const id = await db(TABLE).insert(reserva);
            return await db(TABLE).where({ id: id[0] }).first();
        } catch(error) {
            throw error;
        }
    }
}