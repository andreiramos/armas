const conexao = require('./conexao')

var arma = conexao.Schema({
    titulo:{
        type:String
    },
    isbn:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    cliente:{
        type:conexao.Schema.Types.ObjectId,
        ref: "cliente"
    },
    loja:{
        type:conexao.Schema.Types.ObjectId,
        ref: "loja"
    },
    funcionarios:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "funcionarios"
    }]
})

module.exports = conexao.model("arma",arma)