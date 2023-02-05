const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 6 characters']
    },
    highScore: {
        type: Number
    }

})

module.exports = user = mongoose.model('user', userSchema);