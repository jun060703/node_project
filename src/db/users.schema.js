const {model,Schema} = require('mongoose')


const userScema = new Schema({

    id:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    
    name:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true
    },
})

module.exports = model('user',userScema)