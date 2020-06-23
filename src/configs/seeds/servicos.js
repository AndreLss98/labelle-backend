exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('servico').del()
    .then(async function () {
      // Inserts seed entries
      await knex('servico').insert([
        { nome: 'Unha', icone_path: 'nail.svg' },
        { nome: 'Cabelo', icone_path: 'hair-cut.svg' },
        { nome: 'Maquiagem', icone_path: 'maquiagem.svg' }
      ]);

      return knex('profissional_servico').insert([
        { profissional_id: 1, servico_id: 1, valor: 22, disponivel: true },
        { profissional_id: 1, servico_id: 2, valor: 85, disponivel: true },
        { profissional_id: 1, servico_id: 3, valor: 85, disponivel: false },
        { profissional_id: 2, servico_id: 1, valor: 15, disponivel: true },
        { profissional_id: 2, servico_id: 2, valor: 95, disponivel: true },
        { profissional_id: 2, servico_id: 3, valor: 50, disponivel: true }
      ]);
    });
};
