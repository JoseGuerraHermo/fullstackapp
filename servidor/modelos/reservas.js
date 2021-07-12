const mongoose = require('mongoose')
const reservasModelo = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
})
const Reservas = mongoose.model('Reservas', reservasModelo)

module.exports = Reservas
