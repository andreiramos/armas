var express = require('express')
var route = express.Router()
var armaCtr = require('../control/armaCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',armaCtr.getArmas, armaCtr.listar)
route.get('/',armaCtr.getArmas, armaCtr.listar)

//rota para listar por filtro
route.post('/', armaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', armaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), armaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', armaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), armaCtr.edita)

//rota para deletar
route.get('/del/:id', armaCtr.deleta)

module.exports = route;