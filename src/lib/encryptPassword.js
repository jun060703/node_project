const crypto = require('crypto')

module.exports = function encryptPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password + '#0g830T8Ha)*fdH9312R{}')
        .digest('base64')
}