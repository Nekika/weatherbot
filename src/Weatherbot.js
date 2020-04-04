const Discord = require('discord.js')
const WeatherDatas = require('./WeatherData')

class Weatherbot extends Discord.Client{
    // Build a Weatherbot
    constructor() {
        super()
        this.requests = [
            /help/,                                     // help
            /[0-9]{5}(,[a-zA-Z]{2})?/,                  // weather by zipcode[,country]
            /[a-zA-z]+([ -][a-zA-Z]+)*(,[a-zA-Z]{2})?/, // weather by city[,country]
        ]
    }

    // Indicates that the bot is connected to the server and set it's activity
    async init(){
        try {
            await this.user.setActivity('Type !weather help | @Nekika#1693')
        } catch (e) {
            throw e
        }
    }

    isValid(request) {
        let validity = false
        this.requests.forEach(r => { if (request.match(r)) { validity = true} })
        return validity
    }

    // Isolates the requets from the command and inspect it
    inspect(message) {
        const regex = /^!weather .*/
        if (message.content.match(regex)) {
            const cmd = '!weather '
            const request = message.content.substring(cmd.length)
            if (this.isValid(request)) {
                return this.execute(message, request)
            } else {
                this.reject(message, `woops... unknown command ***${request}*** | type **!weather help** to get some help`)
            }
        }
    }

    // Execute a request
    async execute(message, request){
        let response
        if (request === 'help') {
            response = this.help()
        } else {
            const args = request.split(',')
            const city = {name: args[0], country: args[1] || 'fr'}
            response = await this.weather(city)
        }
        message.channel.send(response)
    }

    help() {
        return new Discord.RichEmbed()
            .setTitle('Help')
            .setDescription('**Different ways to get the current weather for a city**')
            .addField('General use', 'France : *!weather city* | World : *!weather city,country*')
            .addField('*Tip*', '*[] mean that this part of the command is optionnal*')
            .addField('Get by Zipcode (most accurate)', 'Example : *!weather 57000[,FR]*')
            .addField('Get by Name', 'Example : *!weather San Francisco,US*')
    }

    async weather(city) {
        try {
            const data = await WeatherDatas.getData(city)
            console.log(data)
            return new Discord.RichEmbed()
                .setTitle(`Weather for ***${data.name}, ${data.sys.country}***`)
                .addField('\u200B', '\u200B')
                .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                .addField(':thermometer: Temp', `${data.main.temp} °C`, true)
                .addField(':thermometer: Feeling', `${data.main.feels_like} °C`, true)
                .addField('\u200B', '\u200B')
                .addField(':wind_blowing_face:  Wind', `${data.wind.speed} km/h`, true)
                .addField(':droplet:  Humidity', `${data.main.humidity} %`, true)
        } catch (e) {
            throw e
        }
    }

    // Reject a request
    reject(message, issue){
        message.channel.send(issue)
    }
}

module.exports = Weatherbot