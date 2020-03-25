const express = require('express'); //importa express

const OngController = require('./controllers/OngController.js'); //importa as funções de listagem e criação de Ongs
const IncidentController = require('./controllers/IncidentController.js'); //importa as funções de listagem e criação de casos
const ProfileController = require('./controllers/ProfileController.js'); //importa as funções de listagem criadas por determinada ong
const SessionController = require('./controllers/SessionController.js'); //importa a função de login

const routes = express.Router(); //Módulo de rotas do express

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes; //exporta a variável routes
