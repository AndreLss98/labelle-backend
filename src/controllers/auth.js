const routes = require('express').Router();

const Cliente = require('./../repositorys/cliente');
const Profissional = require('./../repositorys/profissional');

routes.post('/cliente', async (req, res, next) => {
    const { email, senha } = req.body;
    if (!email) return res.status(400).send({ error: "Email is required" });
    if (!senha) return res.status(400).send({ error: "Password is required" });

    const usuario = await Cliente.getByEmail(email);

    if (!usuario) return res.status(400).send({ error: "Email or Password is invalid" });

    if (usuario.senha !== senha) return res.status(400).send({ error: "Password invalid" });

    return res.status(200).send(usuario);
});

routes.post('/profissional', async (req, res, next) => {
    const { email, senha } = req.body;
    if (!email) return res.status(400).send({ error: "Email is required" });
    if (!senha) return res.status(400).send({ error: "Password is required" });

    const usuario = await Profissional.getByEmail(email);

    if (!usuario) return res.status(400).send({ error: "Email or Password is invalid" });

    if (usuario.senha !== senha) return res.status(400).send({ error: "Password invalid" });

    return res.status(200).send(usuario);
});

module.exports = app => app.use('/auth', routes);