const express = require('express')
const router = express.Router()
let Reservas = require('../modelos/reservas')
let errorEncontrado = (err) => `Se ha producido un error: ${err}.`

router.route('/').get((req, res) => {
  Reservas.find()
    .then((reservas) => res.json(reservas))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})
router.route('/nuevareserva').post((req, res) => {
  comprobarEmail = (email) => {
    const regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexCheck.test(email)
  }

  const { nombre, email, telefono, hora } = req.body
  const fecha = Date.parse(req.body.fecha)

  if (!nombre || !email || !telefono || !hora || !comprobarEmail(email)) {
    return res
      .status(333)
      .json('Por favor rellene correctamente todos los campos.')
  }

  const nuevaReserva = new Reservas({
    nombre,
    email,
    telefono,
    hora,
    fecha,
  })
  nuevaReserva
    .save()
    .then(() => res.json('Reserva hecha.'))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})
router.route('/borrar/:id').delete((req, res) => {
  Reservas.findByIdAndDelete(req.params.id)
    .then(() => res.json('Reserva borrada.'))
    .catch((err) => res.status(400).json(errorEncontrado(err)))
})
router.route('/actualizar/:id').post((req, res) => {
  Reservas.findById(req.params.id).then((reserva) => {
    ;(reserva.nombre = req.body.nombre),
      (reserva.email = req.body.email),
      (reserva.comensales = Number(req.body.comensales)),
      (reserva.comentario = req.body.comentario),
      (reserva.hora = req.body.hora),
      (reserva.fecha = Date.parse(req.body.fecha))

    reserva
      .save()
      .then(() => res.json('Reserva actualizada.'))
      .catch((err) => res.status(400).json(errorEncontrado(err)))
  })
})

module.exports = router
