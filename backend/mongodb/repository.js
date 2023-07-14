const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://jellyscriptjam:Gks6llxeQASVnc1W@codejam0.u3vgu5f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>
        console.log(
            `Established connection to MongoDB on host ${result.connection.host}:${result.connection.port} with user ${result.connection.user}`
        )
    )
    .catch((err) => console.error(err));

const scoreSchema = require('./schema');
const Score = mongoose.model('Score', scoreSchema.schema);

const updateScore = (userName, score) => {
    const newScore = new Score({
        _id: userName,
        score: score,
        updatedAt: Date.now()
    })
    newScore.save();
}

const listTopUsers = (count) => {
    return Score.find()
        .sort({ score: -1 })
        .limit(count);
}

exports.updateScore = updateScore;
exports.listTopUsers = listTopUsers;
