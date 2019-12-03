var express = require('express')
var route = express.Router()
var lojaCtr = require('../control/lojaCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',lojaCtr.getlojas, lojaCtr.listar)

//rota para listar todos
route.get('/', lojaCtr.listar)

//rota para listar por filtro
route.post('/', lojaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', lojaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), lojaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', lojaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), lojaCtr.edita)

//rota para deletar
route.get('/del/:id', lojaCtr.deleta)

module.exports = route;