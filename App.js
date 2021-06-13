//Carregando os modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const parth = require("path")
//const mongoose = require("mongoose")

//Configurações

   //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    app.use(express.urlencoded({extended:true}))
    app.use(express.json())

    //Mongosse
//Public
    app.use(express.static(parth.join(__dirname, "public")))


//Rotas
    app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando!")
})
