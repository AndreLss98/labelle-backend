
exports.up = function(knex) {
  return knex.schema.createTable('local', table => {
    table.integer('profissional_id').unsigned().primary().references('profissional.id');
    table.string('cep', 15).notNullable();
    table.string('rua', 100).notNullable();
    table.string('setor', 100);
    table.integer('numero');
    table.string('quadra', 100).notNullable();
    table.string('cidade', 100).notNullable();
    table.string('estado', 100).notNullable();
    table.specificType('latitude', 'double').notNullable();
    table.specificType('longitude', 'double').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('local');
};
