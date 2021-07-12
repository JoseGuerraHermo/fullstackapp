const mongoose = require('mongoose')
const usuariosModelo = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contrasenha: {
    type: String,
    required: true,
  },
})
const Usuarios = mongoose.model('Usuarios', usuariosModelo)

module.exports = Usuarios
