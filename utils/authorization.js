//@ts-check
const handleResponse = require('./responseHanlder')

exports.hasRole = (role)=> {
  return function(req,res,next){
    let {role:userRole} = req.user
    if(role !== userRole){
      return handleResponse(res, 401, 'Unauthorized')
    }
    next()
  }
}