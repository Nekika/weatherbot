const API_CONF = require('./config/API')
const App = require('./src/Weatherbot');
const bot = new App();

bot.on('ready', async () => {
    await bot.init();
})

bot.on('message', message => {
    bot.inspect(message)
})

bot.login(API_CONF.client.token)
    .then(() => console.log(`Logged in as ${bot.user.tag}!`))
    .catch(err => { throw err })
