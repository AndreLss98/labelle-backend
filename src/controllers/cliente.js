const routes = require('express').Router();

const Reserva = require('./../repositorys/reserva');
const ServicoReserva = require('./../repositorys/servico_reserva');

routes.post('/reserva', async (req, res, next) => {
    let { reserva, servicos } = req.body;
    try {
        reserva = await Reserva.save(reserva);
    } catch(error) {
        return res.status(400).send(error);
    }

    for (let servico of servicos) {
        servico.reserva_id = reserva.id;
        await ServicoReserva.save(servico);
    }
    return res.status(200).send(reserva);
});

module.exports = app => app.use('/clientes', routes);