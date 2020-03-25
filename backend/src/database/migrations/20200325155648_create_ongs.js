exports.up = function(knex) { //criação da tabela ao executar a migration
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //Coluna primary
        table.string('name').notNullable(); //coluna name, não nula
        table.string('email').notNullable(); //coluna email, não nula
        table.string('whatsapp').notNullable(); //coluna wpp, não nula
        table.string('city').notNullable(); //coluna cidade, não nula
        table.string('uf', 2).notNullable(); //coluna estado, não nula
    });
};

exports.down = function(knex) { //rollback, deleta a tabela
    return knex.schema.dropTable('ongs');
};
