exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('servico').del()
    .then(function () {
      // Inserts seed entries
      return knex('servico').insert([
        { nome: 'Unha', icone_path: 'nail.svg' },
        { nome: 'Cabelo', icone_path: 'hair-cut.svg' },
        { nome: 'Maquiagem', icone_path: 'maquiagem.svg' }
      ]);
    });
};
