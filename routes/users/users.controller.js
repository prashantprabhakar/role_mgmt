
// @ts-check
const handleResponse = require('./../../utils/responseHanlder')
const userModel = require('../../models/users.model')
const roles = require('./../../config/config').roles

exports.getUserList = async(req,res)  => {
  try{
    let users = await userModel.find({},{password: 0})
    return handleResponse(res,200,'User list fetched', {users})

  } catch(e){
    return handleResponse(res,500)
  }
}

exports.getUserAddress = async(req,res) => {
  try{
    let {email} = req.query
    if(!email){
      return handleResponse(res,400, 'Missing email')
    }
    let user = await userModel.findOne({email},{address:1})
    if(!user){
      return handleResponse(res, 400, 'No user found')
    }
    if(!user.address){
      return handleResponse(res, 400, 'No address found')
    }
    return handleResponse(res, 200, 'User details found', {address:user.address})
  } catch(e){
    return handleResponse(res,500)
  }
}

exports.getUserContact = async(req,res) => {
  try{
    let {email} = req.query
    if(!email){
      return handleResponse(res,400, 'Missing email')
    }
    let user = await userModel.findOne({email},{contactNo:1})
    if(!user){
      return handleResponse(res, 400, 'No user found')
    }
    if(!user.contactNo){
      return handleResponse(res, 400, 'No contact no found')
    }
    return handleResponse(res, 200, 'User detaiils found', {contactNo:user.contactNo})
  } catch(e){
    return handleResponse(res,500)
  }
}

exports.testApi =  async(req,res) => {
  handleResponse(res,200,'Api is working')
}