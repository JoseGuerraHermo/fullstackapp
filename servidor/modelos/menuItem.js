const mongoose = require('mongoose')
const itemModelo = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
})

const menuItem = mongoose.model('menuItem', itemModelo)

module.exports = menuItem
