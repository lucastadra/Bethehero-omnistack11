const connection = require('../database/connection.js');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //busca casos criados pela ong
            .select('*');

        return response.json(incidents); 
    }
}