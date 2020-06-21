exports.up = function (knex) {
  return knex.schema.createTable('reserva', table => {
    table.increments('id');
    table.integer('profissional_id').unsigned().notNullable().references('profissional.id');
    table.integer('cliente_id').unsigned().notNullable().references('cliente.id');
    table.specificType ('dia', 'smallint').notNullable();
    table.specificType ('mes', 'smallint').notNullable();
    table.specificType ('ano', 'smallint').notNullable();
    table.time('horario').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('reserva');
};
