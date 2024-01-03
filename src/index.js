const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const express = require('express'); 
const app = express();

const signinRoute = require('./server/routes/siginin');
const signupRoute = require('./server/routes/signup');

const dbconnect = require('./db/connect');
const Users = require('./db/users.schema');
const encryptPassword = require('./lib/encryptPassword');
const initExpressApp = require('./server/initExpressApp');

async function a() {
    console.log('DB접속 시도');
    await dbconnect(); 
    console.log('DB접속 완료');

    await Users.create({
        id: 'asdf',
        password: 'asdf',
        name: '123123123123',
        age: 12
    });

    console.log(await Users.find());
}

a();

initExpressApp(app);

const routes = [signinRoute, signupRoute];

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

let users = [];

app.get('/users/me', (req, res) => {
    const { idx } = req.session;

    const me = users.find(user => {
        return user.idx === idx;
    });
    return res.json(me);
});

app.get('/users', (req, res) => {
    return res.json(users);
});


app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params

    const filterFunc = (user) => {
        if (user.idx !== userId) return true
        return false
    }

    users = users.filter(filterFunc)

    return res.json({ success: true })
})

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
