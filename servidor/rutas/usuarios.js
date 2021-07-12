const express = require('express')
const router = express.Router()
const Usuario = require('../modelos/usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { BCRYPTCLAVE, JWT_SECRET } = require('../claves/claves')
let errorEncontrado = (err) => `Se ha producido un error: ${err}.`

router.route('/nuevousuario').post((req, res) => {
  comprobarEmail = (email) => {
    const regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexCheck.test(email)
  }
  const { nombre, email, contrasenha } = req.body
  if (!nombre || !email || !contrasenha || !comprobarEmail(email)) {
    return res.status(422).json('Por favor rellena todos los campos.')
  }
  Usuario.findOne({ email: email }).then((usuarioGuardado) => {
    if (usuarioGuardado) {
      return res.status(422).json('Este usuario ya está registrado.')
    }
    bcrypt.hash(contrasenha, BCRYPTCLAVE).then((contraHasheada) => {
      const usu = new Usuario({
        nombre: nombre,
        email: email,
        contrasenha: contraHasheada,
      })
      usu
        .save()
        .then(() => res.json('Usuario nuevo resgistrado con exito'))
        .catch((err) => res.status(400).json(errorEncontrado(err)))
    })
  })
})

router.route('/entrar').post((req, res) => {
  const { email, contrasenha } = req.body
  if (!email || !contrasenha) {
    return res.status(422).json('Por favor rellena todos los campos.')
  }
  Usuario.findOne({ email: email })
    .then((usuarioEnBD) => {
      if (!usuarioEnBD) {
        return res.status(422).json(errorEncontrado(err))
      }
      bcrypt
        .compare(contrasenha, usuarioEnBD.contrasenha)
        .then((concuerda) => {
          if (concuerda) {
            const token = jwt.sign({ usuarioEnBD }, JWT_SECRET)
            res.json({ token })
          } else {
            return res.status(422).json('Email o contraseña no validos.')
          }
        })
        .catch((err) => res.status(422).json(errorEncontrado(err)))
    })
    .catch((err) => res.status(422).json(errorEncontrado(err)))
    .catch((err) => res.status(422).json(errorEncontrado(err)))
})
router.route('/').get((req, res) => {
  Usuario.find()
    .then((usuario) => res.json(usuario))
    .catch((err) => res.status(404).json(errorEncontrado(err)))
})

router.route('/actualizarusuario/:id').post((req, res) => {
  Usuario.findById(req.params.id).then((actualizar) => {
    ;(actualizar.nombre = req.body.nombre),
      (actualizar.email = req.body.email),
      (actualizar.contrasenha = bcrypt.hashSync(
        req.body.contrasenha,
        BCRYPTCLAVE,
      ))

    actualizar
      .save()
      .then(() => res.json('Credenciales actualizadas.'))
      .catch((err) => res.status(400).json(errorEncontrado(err)))
  })
})

router.route('/borrarusuario/:id').delete((req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then(() => res.json('Usuario/a borrado/a.'))
    .catch((err) => res.status(404).json(errorEncontrado(err)))
})
module.exports = router
