// @ts-check
var JWT = require('jsonwebtoken');
var {secret, jwtTokenExpireTime } = require('../config/config');


exports.sign = function(key, expireTime=jwtTokenExpireTime) {
    return new Promise((resolve, reject) => {
    try{
      var token = JWT.sign(key, secret, {expiresIn: expireTime});
      resolve(token);
    }catch(e){
      console.log('error in signing JWT', e);
      reject(e);
    }
      
  })
}


exports.decode = function(jwt){
  return new Promise((resolve, reject) =>{
    try{
      JWT.verify(jwt, secret, (err, decoded) =>{
        (err || !decoded) ? reject(err) : resolve(decoded);
      })
    }catch(e){
      console.log('unable to decode JWT token: ', jwt, 'error:',e);
      reject(e);
    }
  })
}
