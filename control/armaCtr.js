var arma = require('../model/arma')
var loja = require('../model/loja')
var cliente = require('../model/cliente')
var funcionarios = require('../model/funcionarios')

//middleware para buscar armas
function getArmas(req, res, next) {
    arma.find({}).lean().exec(function (err, docs) {
        req.armas = docs
        next()
    })
}

function listar(req, res) {
    arma
        .find({})
        .populate('cliente')
        .populate('loja')
        .populate('funcionarios')
        .lean()
        .exec(function (err, docs) {
            console.log(docs)
            res.render('arma/list.ejs', { "Armas": docs })
        })
}

function filtrar(req, res) {
    arma
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('cliente')
        .populate('loja')
        .populate('funcionarios')
        .lean()
        .exec(function (err, docs) {
            res.render('arma/list.ejs', { "Armas": docs })
        })
}

function abrirAdiciona(req, res) {
    loja
        .find({})
        .lean()
        .exec(function (e, lojas) {
            funcionarios
                .find({})
                .lean()
                .exec(function (e, funcionarios) {
                    cliente
                        .find({})
                        .lean()
                        .exec(function (e, clientes) {
                            res.render("arma/add.ejs", { "Lojas": lojas, "Funcionarios": funcionarios, "Clientes": clientes })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoLivro = new arma({
        titulo: req.body.nome,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        cliente: req.body.cliente,
        loja: req.body.loja,
        funcionarios: req.body.funcionarios,
    })
    novoLivro.save(function (err) {
        if (err) {
            arma.find({}).populate('cliente').populate('loja').populate('funcionarios').lean().exec(function (err, docs) {
                res.render('arma/list.ejs', { msg: "Problema ao salvar!", Armas: docs })
            })
        } else {
            arma.find({}).populate('cliente').populate('loja').populate('funcionarios').lean().exec(function (err, docs) {
                res.render('arma/list.ejs', { msg: "Adicionado com sucesso!", Armas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    loja.find({}).lean().exec(
        function (e, lojas) {
            funcionarios.find({}).lean().exec(
                function (e, funcionarios) {
                    cliente.find({}).lean().exec(
                        function (e, clientes) {
                            arma.findOne({ _id: req.params.id }).populate('cliente').populate('loja').populate('funcionarios').exec(
                                function (err, arma) {
                                    res.render('arma/edit.ejs', { 'arma': arma, "Lojas": lojas, "Funcionarios": funcionarios, "Clientes": clientes });
                                });
                        });
                });
        });
}

function edita(req, res) {
    arma.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            cliente: req.body.cliente,
            loja: req.body.loja,
            funcionarios: req.body.funcionarios
        }, function (err) {
            if (err) {
                arma.find({}).populate('cliente').populate('loja').populate('funcionarios').lean().exec(function (err, docs) {
                    res.render('arma/list.ejs', { msg: "Problema ao editar!", Armas: docs })
                })
            } else {
                arma.find({}).populate('cliente').populate('loja').populate('funcionarios').lean().exec(function (err, docs) {
                    res.render('arma/list.ejs', { msg: "Editado com sucesso!", Armas: docs })
                })
            }
        })
}

function deleta(req, res) {
    arma.findByIdAndDelete(req.params.id, function () {
        arma.find({}).populate('cliente').populate('loja').populate('funcionarios').lean().exec(function (err, docs) {
            res.render('arma/list.ejs', { msg: "Removido com sucesso!", Armas: docs })
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
    getArmas
}