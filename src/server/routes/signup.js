const _ = require('lodash')
const {v4:uuidv4} = require('uuid')
const encryptPassword = require('../../lib/encryptPassword')


module.exports = {
    path:'signup',
    method:'post',
    handler:('/signup', (req, res) => {
        const user = _.pick(
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
        const idcheck = users.find(u => {
            return u.id === user.id
        })
    
        if (idcheck == undefined) {
            users.push(Object.assign(user,
                {
                    idx: uuidv4(),
                    ...(user.password !== undefined && {
                        password: encryptPassword(user.password)
                    })
    
                }))
            return res.json({success:true})
        }
        return res.status(400).json({ success: false })
    })
}