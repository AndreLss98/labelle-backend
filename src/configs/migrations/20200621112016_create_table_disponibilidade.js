exports.up = function (knex) {
  return knex.schema.createTable('disponibilidade', table => {
    table.integer('profissional_id').unsigned().notNullable().primary().references('profissional.id');
    table.string('dias_semana', 15);
    table.time('horario_inicio');
    table.time('horario_fim');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('disponibilidade');
};
