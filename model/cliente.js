const conexao = require('./conexao')

var cliente = conexao.Schema({
    nome:{
        type:String
    },
    livros:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"arma"
        }
    ]
})

module.exports = conexao.model("cliente",cliente)