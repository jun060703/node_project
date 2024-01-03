const mongoose = require('mongoose')


const id = 'sdh220402'
const password = 'X6vNqIWSy6FHaOYb'
const connectionString = `mongodb+srv://${id}:${password}@cluster0.boahwz4.mongodb.net/?retryWrites=true&w=majority`

module.exports = async function(){
    await mongoose.connect(connectionString)
    console.log('conected!')
}