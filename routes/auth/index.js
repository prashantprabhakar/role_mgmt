
const router = require('express').Router()

let signupCtrl = require('./signup.controller')
let loginCtrl = require('./login.controller')

// public routes
router.post('/signup', signupCtrl.signup)
router.post('/login', loginCtrl.login)

module.exports = router