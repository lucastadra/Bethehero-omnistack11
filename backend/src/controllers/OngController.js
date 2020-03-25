const connection = require('../database/connection.js'); //conexão com BD
const crypto = require('crypto'); //importa crypto para gerar id aleatória

/*Camada de abstração das funções de listagem e criação de ONGs*/

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //Gera 4 bytes de números e letras

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }) //insere dados na tabela 

        return response.json({ id }); //retorna a id para a ONG conectar-se
    }
};