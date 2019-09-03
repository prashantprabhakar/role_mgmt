//@ts-check
'use strict'

/**
 * can handle status codes and default message as per range
 * handled using switch for now but can be handled using if with ranges
 */
function handleResponse(res, statusCode, message='Something went wrong', data=null) {

    switch(statusCode) {
      case 200:
        return res.status(statusCode).json({ success: true, message, data })
      
      case 201:
        return res.status(statusCode).json({ success: true, message, data })
  
      case 404:
        return res.status(statusCode).json({ success: false, message, data })
      
      case 401:
          return res.status(statusCode).json({ success: false, message, data })
      
      case 500:
        return res.status(statusCode).json({success:false, message, data})
  
      default:
        return res.status(404).json({ success: false, message})
    }
}
  
  module.exports = handleResponse
  
