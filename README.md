## Samle ACL

A samle using basic ACL

## Start:
    npm install
    node app.js

## Run tests
    npm install
    npm test

### Supported APIs

##### Signup

- **API Endpoint**: /api/auth/signup
- **Header**: content-type: application/json
- **Method**: POST
- **Params**: name, email, password, address, contactNo, role

    Note: Only ['user', 'admin', 'customerSupport', 'deliveryPerson'] roles are supported

##### Login

- **API Endpoint:** /api/auth/login
- **Method**: POST
- **Params**: email, password

##### Get user list

- **API Endpoint:** /api/user/user-list
- **Method**: POST
- **Header**: content-type: application/json , Authorization: jwt + <jwt_token>
- **Role**: admin

##### Get User Address

- **API Endpoint:** /api/user/get-user-address
- **Method**: GET
- **Header**: content-type: application/json , Authorization: jwt + <jwt_token>
- **Query Params**: email
- **Role**: deliveryPerson


##### Get User Contact No

- **API Endpoint:** /api/user/get-user-contact
- **Method**: GET
- **Header**: content-type: application/json , Authorization: jwt + <jwt_token>
- **Query Params**: email
- **Role**: customerSupport

##### Dummy API

- **API Endpoint:** /api/user/test
- **Method**: GET
- **Role**: anyone ( login is not required)






