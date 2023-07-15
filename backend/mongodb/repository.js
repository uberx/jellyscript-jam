const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
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

const updateScore = (username, score, resultCallback, errorCallback) => {
    console.log('Updating score to', score, 'for username', username);
    const newScore = new Score({
        username: username,
        score: score,
        updatedAt: Date.now()
    })

    let error;
    newScore.save((err, result) => {
        if (err) {
            errorCallback(err);
        }
        else {
            resultCallback(result);
        }
    });
    return error;
}

const listTopScores = (count, resultCallback, errorCallback) => {
    console.log('Listing top', count, 'scores');
    Score.find()
        .sort({ score: -1 })
        .limit(count)
        .exec((err, result) => {
            if (err) {
                errorCallback(err);
            }
            else {
                resultCallback(result);
            }
        })
}

exports.updateScore = updateScore;
exports.listTopUsers = listTopScores;
