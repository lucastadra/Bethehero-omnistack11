const connection = require('../database/connection.js');

module.exports = {
    async index(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count(); //conta o número de registros para utilização no frontend

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //dados da ong relacionada ao acidente
            .limit(5) //limita 5 registros por consulta
            .offset((page - 1) * 5) //utiliza page para limitar registros, inicia em 0 e vai até 5, depois de 5 até 10...
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]); //recupera todos os casos da tabela selecionando dados da ong

        response.header('X-Total-Count', count['count(*)']) //retorna o número de registros no cabeçalho da resposta

        return response.json(incidents); //retorna casos
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //recebe o ong id pelo header

        const [id] = await connection('incidents').insert({
            title, 
            description,
            value,
            ong_id,
        });

    return response.json({ id }); //retorna o id para o frontend
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization; //recebe o ong id pelo header

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ //401 -> não permitido
                error: 'Operation not permitted.'
            });
        }    

        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send(); //204 -> sucesso, mas sem content
    }

};