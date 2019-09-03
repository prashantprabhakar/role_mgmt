const mongoose = require('mongoose')
const {roles} = require('../config/config').roles

const userSchema = new mongoose.Schema({
  name:  {type: String},
  email: { type:String, required: true, unique: true},
  password: {type:String, required:true},
  role: {type: String, enum:roles}, // we could use numeric val for same, kept string for more readibilty in app
  address: {type:String},
  contactNo: {type: String},
  ctrd: { type: Date, default: Date.now}, // time when record was inserted
})

module.exports = mongoose.model('users', userSchema)
