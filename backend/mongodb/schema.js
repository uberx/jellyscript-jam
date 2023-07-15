const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: uuidv4
    },
    username: {
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