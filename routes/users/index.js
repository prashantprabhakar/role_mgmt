// @ts-check
const router = require('express').Router()
const passport = require('passport');

let userCtrl = require('./users.controller')
const {hasRole} = require('../../utils/authorization')

// public routes
router.get('/test',
  userCtrl.testApi)

//secured routes
router.use(passport.authenticate('jwt', { session: false }))

router.get('/user-list',
  hasRole('admin'),
  userCtrl.getUserList)

router.get('/get-user-address',
  hasRole('deliveryPerson'),
  userCtrl.getUserAddress)

router.get('/get-user-contact',
  hasRole('customerSupport'),
  userCtrl.getUserContact)



module.exports = router