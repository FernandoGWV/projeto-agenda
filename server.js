// as .envs só funciona com isso
require("dotenv").config({})

const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const csrf = require('csurf')
const {meuMiddleWare, checkCsrfError, csfrMiddleware} = require('./src/middlewares/middleware')
const MongoStore = require('connect-mongo')

// require são imports mano, deixa sempre ali em cima


require('dotenv').config()
const app = express()
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTIONSTRING).then(() =>{
  app.emit('pronto')
})



app.use(express.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname, 'public')))



app.use(cookieParser())



const sessionOption = session({
  secret:'wquieksajfgq',
  store: MongoStore.create({  mongoUrl: process.env.CONNECTIONSTRING,}),
  resave:false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24  * 7,
    httpOnly:true
  }
})
app.use(csrf({cookie: true}))
app.use(helmet())

app.use(sessionOption)
app.use(flash())


app.set('views', path.resolve(__dirname,'src', 'views'))
app.set('view engine','ejs' )
app.use(meuMiddleWare)
app.use(checkCsrfError)
app.use(csfrMiddleware)
app.use(routes)


app.on('pronto', () =>{
app.listen(3000,() =>{
  console.log('ACESSAR: http://localhost:3000')
  console.log('servidor inicado')
})
})
