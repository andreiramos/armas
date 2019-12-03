var express = require('express')
var route = express.Router()
var funcionariosCtr = require('../control/funcionariosCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',funcionariosCtr.getfuncionarioss, funcionariosCtr.listar)

//rota para listar todos
route.get('/', funcionariosCtr.listar)

//rota para listar por filtro
route.post('/', funcionariosCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', funcionariosCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), funcionariosCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', funcionariosCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), funcionariosCtr.edita)

//rota para deletar
route.get('/del/:id', funcionariosCtr.deleta)

module.exports = route;