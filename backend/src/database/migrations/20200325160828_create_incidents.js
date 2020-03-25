exports.up = function(knex) { //criação da tabela ao executar a migration
    return knex.schema.createTable('incidents', function (table) { //cria a tabela incidents
        table.increments(); //auto incrementa primary key

        table.string('title').notNullable(); //coluna title, não nula
        table.string('description').notNullable(); //coluna description, não nula
        table.decimal('value').notNullable(); //coluna value, não nula

        table.string('ong_id').notNullable(); //id da ong que criou o incident

        table.foreign('ong_id').references('id').inTable('ongs'); //Coluna ong id referencia coluna id na tabela ongs
    });
};

exports.down = function(knex) { //rollback, deleta a tabela
    return knex.schema.dropTable('incidents');
};
