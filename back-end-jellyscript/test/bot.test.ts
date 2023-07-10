import tmi from 'tmi.js';
import {Bot} from '../src/bot';

test('handles the !game command', () => {
    const options = {
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
    const channel = 'channel1';
    const userstate: tmi.ChatUserstate = {
        'display-name': 'testuser',
        username: 'testuser',
        'user-id': '1234567890',
        'user-type': 'mod',
    };

    const message = '!game';
    const client = new tmi.client(options);
    const bot = new Bot(client);
    const self = false;
    jest.spyOn(tmi.Client.prototype, 'say').mockImplementation(() => Promise.resolve()); //add jest
    bot.handleChat(channel, userstate, message, self);
    expect(tmi.Client.prototype.say).toHaveBeenCalledWith(channel, `@${userstate.username}, you are currently playing the game!`);
})








