const mongoose = require('mongoose');
const userScheema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "https://img.icons8.com/ios-glyphs/30/user--v1.png"
    },
    token: {
        type: String
    }
})
const Users = mongoose.model('User', userScheema)
module.exports = Users;