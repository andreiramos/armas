var funcionarios = require('../model/funcionarios')


//middleware para buscar funcionarios
function getFuncionarios(req, res, next) {
    funcionarios.find({}).lean().exec(function (err, docs) {
        req.armamento = docs
        next()
    })
}

function listar(req, res) {
    funcionarios.find({}).lean().exec(function (err, docs) {
        res.render('funcionarios/list.ejs', { "Funcionarios": docs })
    })
}

function filtrar(req, res) {
    funcionarios.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('funcionarios/list.ejs', { "Funcionarios": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("funcionarios/add.ejs")
}

function adiciona(req, res) {
    var novaArma = new funcionarios({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        datanasc: req.body.datanasc,
        foto: req.file.filename
    })
    novaArma.save(function (err) {
        if (err) {
            funcionarios.find({}).lean().exec(function (err, docs) {
                res.render('funcionarios/list.ejs', { msg: "Problema ao salvar!", Funcionarios: docs })
            })
        } else {
            funcionarios.find({}).lean().exec(function (err, docs) {
                res.render('funcionarios/list.ejs', { msg: "Adicionado com sucesso!", Funcionarios: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    funcionarios.findById(req.params.id, function (err, funcionarios) {
        res.render('funcionarios/edit.ejs', { 'funcionarios': funcionarios });
    })
}

function edita(req, res) {
    funcionarios.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade,
            datanasc: req.body.datanasc,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                funcionarios.find({}).lean().exec(function (err, docs) {
                    res.render('funcionarios/list.ejs', { msg: "Problema ao editar!", Funcionarios: docs })
                })
            } else {
                funcionarios.find({}).lean().exec(function (err, docs) {
                    res.render('funcionarios/list.ejs', { msg: "Editado com sucesso!", Funcionarios: docs })
                })
            }
        })
}

function deleta(req, res) {
    funcionarios.findByIdAndDelete(req.params.id, function () {
        funcionarios.find({}).lean().exec(function (err, docs) {
            res.render('funcionarios/list.ejs', { msg: "Removido com sucesso!", Funcionarios: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getFuncionarios
}