// @ts-check
const userModel = require('./../../models/users.model')
const handleResponse = require('./../../utils/responseHanlder')
const jwtService = require('./../../utils/jwt.service')

exports.login = async(req,res) => {
  let { email, password } = req.body
  if(!email || !password) {
    return handleResponse(res,404, 'missing params')
  }
  let user = await userModel.findOne({ email, password }).select({ _id:1, role:1 })
  if(user) {
    let data = {
      id: user._id,
      role: user.role
    }
    let token = await  jwtService.sign({ data } )
    return handleResponse(res, 200, 'sign in successful', { token, user })
  }
  return handleResponse(res, 401, 'invalid creds')
}