const routes = require('express').Router();

const Profissional = require('./../repositorys/profissional');
const Servico = require('./../repositorys/servico');

/**
 * Cadastra um profissional novo
 */
routes.post('/', async (req, res, next) => {
    let { local } = req.body;
    if (!local) return res.status(400).send({ error: "Local is required" });
    delete req.body.local;

    try {
        const profissional = await Profissional.save(req.body);
        
        local.profissional_id = profissional.id;
        const disponibilidade = { profissional_id: profissional.id };

        await Profissional.saveLocal(local);
        await Profissional.saveDisponibilidade(disponibilidade);

        return res.status(200).send(profissional);
    } catch(error) {
        return res.status(400).send({ error });
    }
});

/**
 * Atualiza dados dos servicos oferecidos pelo profissional
 */
routes.put('/servicos', async (req, res, next) => {
    const { profissionalId, servicos } = req.body;
    const response = await Servico.updateValues(profissionalId, servicos);
    return res.status(200).send({ response });
});

module.exports = app => app.use('/profissionais', routes);