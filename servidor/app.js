const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGOURI, PORT } = require('./claves/claves')

require('./modelos/menuItem')

app.use(express.json())
app.use(cors())

const platos = require('./rutas/menuItem')
const reservas = require('./rutas/reservas')
const usuarios = require('./rutas/usuarios')

app.use('/platos', platos)
app.use('/reservas', reservas)
app.use('/usuarios', usuarios)

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .on('connected', () => console.log(`Conectado a mongoDB`))
  .catch((error) => console.log(`Se ha producido un error: ${error}`))
mongoose.connect
app.listen(PORT, () => console.log(`Escuchando app en el puerto: ${PORT}`))
