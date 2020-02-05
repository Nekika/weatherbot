const Message = require('./src/Message');
const Bot = require('./src/Weatherbot');
const bot = new Bot();

bot.on('ready', () => {
    bot.init();
});

bot.on('message', message => {
    if (Message.inspect(message) === 'request'){
        bot.treat(message)
    }
});

bot.login();