const mongoose = require('mongoose')
const validator = require('validator')
const ContatoSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  sobrenome: {type: String, required: false, default: ''},
  email: {type: String, required: false, default: ''},
  telefone: {type: String, required: false, default: ''},
  criadoEm: {type: Date, default: Date.now},
  descricao: String 
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function contato(body){
 this.body = body
 this.errors = []
 this.contato = null
}

Contato.prototype.register = function(){
  this.valida()
 /*  if(this.errors) */
}

Contato.prototype.valida() = function() {
 this.cleanUp()
 if(this.body.email && !validator.isEmail(this.body.email)){
this.errors.push('email invalido')
 } 
 if(!this.body.nome) this.errors.push('você precisar por um nome.')
 if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado.')

}


Contato.prototype.cleanUp()= function(){
  for(const key in this.body) {
  if ( typeof this.body[key] !== 'string'){
    this.body[key] = ''
  }
  }

this.body = {
  nome: this.body.email,
  sobrenome: this.body.sobrenome,
  email: this.body.email,
  telefone: this.body.telefone,

}

}

module.exports = Contato