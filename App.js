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
require("./models/Postagem")
const Postagem = mongoose.model("postagens")

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
    app.get('/',  (req, res)=>{

        Postagem.find().lean().populate("categoria").sort({data:"desc"}).then((postagens)=>{
            res.render("index",{postagens:postagens})
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })

    })

    app.get("/postagem/:slug",(req,res)=>{
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem)=>{
            if(postagem){
                res.render("postagem/index", {postagem:postagem})

            }else{
                req.flash("error_msg", "Esta postagem não existe")
                res.redirect("/")
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/404", (req, res)=>{
        res.send('Error 404!')
    })
    app.use('/admin', admin)

   

//Outros

const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando!")
})
