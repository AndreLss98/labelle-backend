exports.up = function (knex) {
  return knex.schema.createTable('profissional_servico', table => {
    table.increments('id');
    table.integer('profissional_id').unsigned().notNullable().references('profissional.id');
    table.integer('servico_id').unsigned().notNullable().references('servico.id');
    table.decimal('valor', 10, 2).defaultTo(0).notNullable();
    table.boolean('disponivel').defaultTo(false).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('profissional_servico');
};
