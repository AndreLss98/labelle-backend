exports.up = function (knex) {
  return knex.schema.createTable('servico_reserva', table => {
    table.integer('pro_servico_id').unsigned().notNullable().references('profissional_servico.id');
    table.integer('reserva_id').unsigned().notNullable().references('reserva.id');
    table.decimal('valor_pago', 10, 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('servico_reserva');
};
