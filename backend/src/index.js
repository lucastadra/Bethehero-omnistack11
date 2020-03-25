const express = require('express'); //importa o módulo express na variável express
const cors = require('cors'); //módulo de segurança
const routes = require('./routes'); //importa rotas

const app = express(); //instância do express

app.use(cors());
app.use(express.json()); //utiliza json para o corpo das requisições (body) (transforma o jsonnpm)
app.use(routes);

app.listen(3333); //ouve a porta 3333 localhost

