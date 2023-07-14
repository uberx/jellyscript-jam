const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        required: true
    }
})

exports.schema = scoreSchema;