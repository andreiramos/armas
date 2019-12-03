var cliente = require('../model/cliente')

//middleware para buscar clientes
function getClientes(req,res,next){
    cliente.find({}).lean().exec(function(err,docs){
        req.clientes = docs
        next()
    })
}

function listar(req,res){
    cliente.find({}).lean().exec(function(err,docs){
        res.render('cliente/list.ejs',{"Clientes" : docs})
    })
}

function filtrar(req,res){
    cliente.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('cliente/list.ejs',{"Clientes" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("cliente/add.ejs")
}

function adiciona(req,res){
    var novoGenero = new cliente({
        nome: req.body.nome
    })
    novoGenero.save(function(err){
        if(err){
            cliente.find({}).lean().exec(function(err,docs){
                res.render('cliente/list.ejs', { msg: "Problema ao salvar!", Clientes: docs })
            })            
        }else{
            cliente.find({}).lean().exec(function(err,docs){
                res.render('cliente/list.ejs', { msg: "Adicionado com sucesso!", Clientes: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    cliente.findById(req.params.id,function(err,cliente){
        res.render('cliente/edit.ejs',{'cliente':cliente});
    })    
}

function edita(req,res){
    cliente.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            cliente.find({}).lean().exec(function(err,docs){
                res.render('cliente/list.ejs', { msg: "Problema ao editar!", Clientes: docs })
            })            
        }else{
            cliente.find({}).lean().exec(function(err,docs){
                res.render('cliente/list.ejs', { msg: "Editado com sucesso!", Clientes: docs })
            })   
        }
    })
}

function deleta(req,res){
    cliente.findByIdAndDelete(req.params.id,function(){
        cliente.find({}).lean().exec(function(err,docs){
            res.render('cliente/list.ejs', { msg: "Removido com sucesso!", Clientes: docs })
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
    getClientes
}