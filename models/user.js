const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { exerciseSchema } = require('./exercise');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    log: [exerciseSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;