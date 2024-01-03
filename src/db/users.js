const encryptPassword = require('../lib/encryptPassword')
const {v4:uuidv4} = require('uuid')


module.exports= [{
    idx: uuidv4(),
    id: 'digitect1',
    password: encryptPassword('he'),
    name: '권준',
    gender: 'male',
    age: 21,
    phoneNumber: '010-0000-0000'
}]