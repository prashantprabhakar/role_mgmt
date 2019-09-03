// @ts-check
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');


const { port, mongoUrl, seedDB } = require('./config/config')
const initDB = require('./utils/initDB')


const app = express()

// setup mongo
const connectMongo = require('./utils/connectMongo')

// cors middleware
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport')(passport);



// use routes
const routes = require('./routes')
app.use('/api',routes)

let server
connectMongo(mongoUrl).then(async() => {
  if(seedDB) await initDB()
  server = app.listen(port, () => {
  	console.log(`server listening on ${port}`)
  })
})


async function stop() {
  console.log("closing server")
  server.close();
}


module.exports = app
module.exports.stop = stop






