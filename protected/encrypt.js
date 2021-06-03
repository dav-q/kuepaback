const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptFuncs = {};

encryptFuncs.generateHashPassword = function(password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
};

encryptFuncs.comparePasswordHash = function(password, hash) {
    return bcrypt.compareSync(password, hash);
};

module.exports = encryptFuncs;