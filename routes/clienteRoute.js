var express = require('express')
var route = express.Router()
var clienteCtr = require('../control/clienteCtr')

// rota para listar todos usando middleware
//route.get('/',clienteCtr.getGeneros, clienteCtr.listar)
route.get('/',clienteCtr.getClientes, clienteCtr.listar)

//rota para listar por filtro
route.post('/', clienteCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', clienteCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', clienteCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', clienteCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', clienteCtr.edita)

//rota para deletar
route.get('/del/:id', clienteCtr.deleta)

module.exports = route;