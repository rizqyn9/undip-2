const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Users = new mongoose.Schema({
    Name:{
        type:String,
    },
    Username:{
        type:String,
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
        required: true,
    },
    Created_At: {
        type : Date,
        default: Date.now
    },
    Created_Moment: {
        type: String
    }
})

Users.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}
Users.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

// Users.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };

module.exports = mongoose.model('User',Users)