exports.up = function(knex) {
  return knex.schema.createTable('servico', table => {
    table.increments('id');
    table.string('nome', 150).unique().notNullable();
    table.string('icone_path', 200);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servico');
};
