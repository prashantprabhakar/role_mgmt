// @ts-check

const userModel = require('./../models/users.model')
const dummyUsers = require('./../config/dummyUsers')

const initializeDB = async() => {
  let isTableInitialized = await userModel.findOne({})
  if(!isTableInitialized) {
    await userModel.insertMany(dummyUsers)

    console.log("DB initialized")
  }
}

module.exports = initializeDB