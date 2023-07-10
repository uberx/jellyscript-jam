import express from 'express';
import tmi from 'tmi.js';
import {Bot} from './bot';
require('dotenv').config();


const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

//TODO: //Add .env file //Start adding the endpoints //Session management

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

let options = {
    options: {
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ['channel1', 'channel2']
};

let client = new tmi.client(options);
const bot = new Bot(client);

client.connect();

client.on('chat', function (channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
    bot.handleChat(channel, userstate, message, self);
});

