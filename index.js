const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var clienteRoute = require('./routes/clienteRoute')
var funcionariosRoute = require('./routes/funcionariosRoute')
var LojaRoute = require('./routes/lojaRoute')
var armaRoute = require('./routes/armaRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(5000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/cliente',clienteRoute)
app.use('/funcionarios',funcionariosRoute)
app.use('/Loja',LojaRoute)
app.use('/arma',armaRoute)