
const users = require('../../db/users.js');
const encryptPassword = require('../../lib/encryptPassword');

module.exports = {
    path: '/signin',
    method: 'post',
    handler: (req, res) => {
        const { id, password } = req.body;

        function findUserByIdAndPassword() {
            return users.find(user => {
                return user.id === id && user.password === encryptPassword(password);
            });
        }

        const user = findUserByIdAndPassword();

        let success = false;

        if (user !== undefined) {
            success = true;
            req.session.idx = user.idx;
        }

        return res.json({ success });
    }
};
