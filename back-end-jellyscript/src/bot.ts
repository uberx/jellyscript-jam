import tmi from 'tmi.js';

export class Bot {
    private client: tmi.Client;

    constructor(client: tmi.Client) {
        this.client = client;
    }

    handleChat(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
        if (self) return;

        const commandName = message.trim();

        if (commandName === '!game') {
            this.client.say(channel, `@${userstate.username}, you are currently playing the game!`);
        } else if (commandName === '!points') {
            this.client.say(channel, `@${userstate.username}, you currently have 0 points!`);
        } else if (commandName === '!challenge') {
            this.client.say(channel, `@${userstate.username}, you have been challenged to a game!`);
        } else {
            console.log(`* Unknown command ${commandName}`);
        }
    }
}
