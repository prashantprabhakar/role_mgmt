var chai = require('chai')
var expect  = require('chai').expect;
let chaiHttp = require('chai-http');


const port = require('../config/config').port

let API_ENDPOINT = `http://localhost:${port}/api/`

const server = require('../app')
let should = chai.should();
chai.use(chaiHttp);




describe('API Testing', async() => {

  let authToken = {
    admin: '',
    dp: '',
    cs: ''
  }

  describe('Login API', async() => {
 
    it('login admin', (done) => {
      let uri =  '/api/auth/login'
      let adminCreds = { email: 'admin@gmail.com', password:1}
      chai.request(server)
        .post(uri)
        .send(adminCreds)
        .end((err,res) => {
          res.should.have.status(200);
          authToken.admin = res.body.data.token
          done()
        })
    })

    it('login custom support', (done) => {
      let uri =  '/api/auth/login'
      let csCreds = { email: 'cs@gmail.com', password:1}
      chai.request(server)
        .post(uri)
        .send(csCreds)
        .end((err,res) => {
          res.should.have.status(200);
          authToken.cs = res.body.data.token
          done()
        })
    }) 

    it('login delivery person', (done) => {
      let uri =  '/api/auth/login'
      let dpCreds = { email: 'dp@gmail.com', password:1}
      chai.request(server)
        .post(uri)
        .send(dpCreds)
        .end((err,res) => {
          res.should.have.status(200);
          authToken.dp = res.body.data.token
          done()
        })
    }) 

  })

  describe('Testing get user API', async() => {
    
    it('admin should be able to fetch user list', (done) => {
      let uri =  '/api/user/user-list'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.admin}`)
        .end((err,res) => {
          res.should.have.status(200);
          expect(res.body.data.users).to.be.an('array')
          done()
        })
    })


    it('Customer Support should not be able to fetch user list', (done) => {
      let uri =  '/api/user/user-list'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.cs}`)
        .end((err,res) => {
          res.should.have.status(401);
          done()
        })
    })

  })


  describe('Testing get address API', async() => {
    
    it('Delivery Person should be able to get user address', (done) => {
      let uri =  '/api/user/get-user-address?email=admin@gmail.com'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.dp}`)
        .end((err,res) => {
          res.should.have.status(200);
          expect(res.body.data.address).to.be.equal('Noida')
          done()
        })
    })


    it('Admin should not be able to get user address', (done) => {
      let uri =  '/api/user/get-user-address?email=admin@gmail.com'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.admin}`)
        .end((err,res) => {
          res.should.have.status(401);
          done()
        })
    })

  })

  describe('Testing get contact API', async() => {
    
    it('Custmer Support should be able to fetch user contact', (done) => {
      let uri =  '/api/user/get-user-contact?email=admin@gmail.com'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.cs}`)
        .end((err,res) => {
          res.should.have.status(200);
          expect(res.body.data.contactNo).to.be.equal('123')
          done()
        })
    })


    it('Admin should not be able to fetch user contact', (done) => {
      let uri =  '/api/user/get-user-contact?email=admin@gmail.com'
      chai.request(server)
        .get(uri)
        .set('Authorization', `jwt ${authToken.admin}`)
        .end((err,res) => {
          res.should.have.status(401);
          done()
        })
    })

  })


})