const express = require('express')
const router = express.Router()
let MenuItem = require('../modelos/menuItem')
let errorEncontrado = (err) => `Se ha producido un error: ${err}.`

router.route('/').get((req, res) => {
  MenuItem.find()
    .then((platos) => res.json(platos))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})

router.route('/:id').get((req, res) => {
  MenuItem.findById(req.params.id)
    .then((platos) => res.json(platos))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})

router.route('/nuevoplato').post((req, res) => {
  const { nombre, descripcion, categoria } = req.body
  const precio = Number(req.body.precio)

  const anhadirPlato = new MenuItem({
    nombre,
    descripcion,
    precio,
    categoria,
  })
  anhadirPlato
    .save()
    .then(() => res.json('Plato añadido.'))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})

router.route('/actualizar/:id').post((req, res) => {
  MenuItem.findById(req.params.id).then((plato) => {
    plato.nombre = req.body.nombre
    plato.descripcion = req.body.descripcion
    plato.precio = Number(req.body.precio)
    plato.categoria = req.body.categoria

    plato
      .save()
      .then(() => res.json('Plato actualizado.'))
      .catch((err) => res.status(400).json(errorEncontrado(err)))
  })
})

router.route('/borrar/:id').delete((req, res) => {
  MenuItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('Plato borrado del menú.'))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})

module.exports = router
