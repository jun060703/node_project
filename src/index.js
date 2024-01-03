const _ = require('lodash')
const {v4:uuidv4} = require('uuid')
const crypto = require('crypto')
const express = require('express')
const app = express();
app.use(express.json())
    

function encryptPassword(password){
    return crypto
    .createHash('sha256')
    .update(password + 'wjdalsrjsqkqh123dk}{}{:>')
    .digest('base64')
}


let users = [{
    idx:uuidv4(),
    id:'jjj',
    password:encryptPassword('this'),
    name:'권준',
    gender:'male',
    age:21,
    phoneNumber:'010-0000-0000'
}]


app.post('/signup', (req,res)=>{
    const user= _.pick(
        req.body,
        [
            'id',
            'password',
            'name',
            'gender',
            'age',
            'phoneNumber'
        ]
 )
    users.push(Object.assign(user,{idx:uuidv4() }))
    return res.json({success:true})
})

app.get('/users',(req,res)=>{
    return res.json(users)
})

app.patch('/users/:userId',(req,res)=>{
    const {userId} = req.params
    const body = req.body
//     for(let i =0; i<users.length;i++){
//         if(users[i].id===userId){
//             if (req.body.name !== undefined)
//             users[i].name = req.body.name
//         }
//     }

    for(let i =0; i<users.length;i++){
        if(users[i].id===userId){
        const newUser = _.pick(req.body,['name','age','gender','phoneNumber'])
        Object.assign(users[i], newUser)
        }
    }
    return res.json({success:true})
})

app.delete('/users/:userId',(req,res)=>{
    const {userId} = req.params
    
    const userIndex = users.findIndex((user) => {
        return user.id === userId
    })
    const newUser = _.pick(req.body, ['id','password','name', 'age', 'gender', 'phoneNumber'])
    if (newUser.password !== undefined){
        newUser.password=encryptPassword(newUser.password)
    }

    Object.assign(users[userIndex], newUser)

    return res.json({success:true})
})

const port=3000
app.listen(port,()=>{
    console.log(`App is runing on port:${port}`)
})

//중복을 최소화