const TABLE = 'cliente';
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(TABLE).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE).insert([
        { email: 'aistiger@gmail.com', senha: '123456', nome: 'André Luís da Silva' },
        { email: 'luizOline@gmail.com', senha: '123456', nome: 'Luiz Henrique Felicio da Silva' }
      ]);
    });
};
