exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profissional').del()
    .then(async function () {
      // Inserts seed entries
      await knex('profissional').insert([
        { email: 'aistiger@gmail.com', senha: '123456', nome: 'André Luís da Silva' },
        { email: 'luizOline@gmail.com', senha: '123456', nome: 'Luiz Henrique Felicio da Silva' }
      ]);

      await knex('disponibilidade').insert([
        { profissional_id: 1, dias_semana: '0,1', horario_inicio: '07:00', horario_fim: '17:00' },
        { profissional_id: 2, dias_semana: '0,1,3', horario_inicio: '07:00', horario_fim: '16:00' }
      ]);

      return knex('local').insert([
        { profissional_id: 1, cep: '74463-450', estado: 'Goias', cidade: 'Goiania', setor: 'Santos Dumont', numero: null, rua: '3', quadra: '66', latitude: -16.648046, longitude: -49.342478 },
        { profissional_id: 2, cep: '74450-490', estado: 'Goias', cidade: 'Goiania', setor: 'Capuava', numero: 33, rua: 'Alameda das Monçoes', quadra: '2', latitude: -16.657043, longitude: -49.323458 }
      ]);
    });
};