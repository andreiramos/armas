var loja = require('../model/loja')


//middleware para buscar editoras
function getLojas(req, res, next) {
    loja.find({}).lean().exec(function (err, docs) {
        req.editoras = docs
        next()
    })
}

function listar(req, res) {
    loja.find({}).lean().exec(function (err, docs) {
        res.render('loja/list.ejs', { "Lojas": docs })
    })
}

function filtrar(req, res) {
    loja.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('loja/list.ejs', { "Lojas": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("loja/add.ejs")
}

function adiciona(req, res) {
    var novoEditora = new loja({
        nome: req.body.nome,
        endereco: req.body.endereco,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoEditora.save(function (err) {
        if (err) {
            loja.find({}).lean().exec(function (err, docs) {
                res.render('loja/list.ejs', { msg: "Problema ao salvar!", Lojas: docs })
            })
        } else {
            loja.find({}).lean().exec(function (err, docs) {
                res.render('loja/list.ejs', { msg: "Adicionado com sucesso!", Lojas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    loja.findById(req.params.id, function (err, loja) {
        res.render('loja/edit.ejs', { 'loja': loja });
    })
}

function edita(req, res) {
    loja.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                loja.find({}).lean().exec(function (err, docs) {
                    res.render('loja/list.ejs', { msg: "Problema ao editar!", Lojas: docs })
                })
            } else {
                loja.find({}).lean().exec(function (err, docs) {
                    res.render('loja/list.ejs', { msg: "Editado com sucesso!", Lojas: docs })
                })
            }
        })
}

function deleta(req, res) {
    loja.findByIdAndDelete(req.params.id, function () {
        loja.find({}).lean().exec(function (err, docs) {
            res.render('loja/list.ejs', { msg: "Removido com sucesso!", Lojas: docs })
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
    getLojas
}