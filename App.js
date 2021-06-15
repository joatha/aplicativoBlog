//Carregando os modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const parth = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

//Configurações

    //Sessao
    app.use(session({
        secret: "joathadesenvolvedor",
        resave: true,
        saveUninitialized:true
    }))
    app.use(flash())

    //Middleware

    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
    
   //Handlebars

    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    app.use(express.urlencoded({extended:true}))
    app.use(express.json())

    //Mongosse

    mongoose.connect("mongodb://localhost/blogapp", {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(()=>{
        console.log("Conectado ao mongo")
    }).catch((err)=>{
        console.log("Erro ao se conectar " +err)
    })
//Public

    app.use(express.static(parth.join(__dirname, "public")))

//Rotas

    app.use('/admin', admin)

//Outros

const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando!")
})
