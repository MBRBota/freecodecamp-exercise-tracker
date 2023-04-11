const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, _id: false });

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = {
    Exercise,
    exerciseSchema
};

