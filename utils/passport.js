// @ts-check
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/users.model')
const config = require('../config/config')

module.exports = function(passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {

    try{
      let user = await UserModel.findOne({_id: jwt_payload.data.id})
      if(user) return done(null, user)
      return done(null, false)
    } catch(e){
      return done(e, false)
    }

  }));
}
