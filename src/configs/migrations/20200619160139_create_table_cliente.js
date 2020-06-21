exports.up = function (knex) {
  return knex.schema.createTable('cliente', table => {
    table.increments('id').primary();
    table.string('email', 100).notNullable();
    table.string('senha', 150).notNullable();
    table.string('nome', 100).notNullable();
    table.string('img_perfil', 150);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cliente');
};
