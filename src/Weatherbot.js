const Discord = require('discord.js')
const WeatherMessage = require('./WeatherMessage')
const Request = require('./Request')
const WeatherDatas = require('./WeatherData')

class Weatherbot extends Discord.Client{
    // Build a Weatherbot
    constructor() {
        super()
    }

    // Indicates that the bot is connected to the server and set it's activity
    async init(){
        try {
            await this.user.setActivity('Type !weather | Made by @Nekika#1693')
        } catch (e) {
            throw e
        }
    }

    // Treat a message
    treat(message){
        const regex = /^!weather .*/
        if (message.content.match(regex)){
            const request = message.content
            if (Request.isValid(request)){
                this.execute(message)
            } else {
                const issue = "Invalid request"
                this.reject(message, issue)
            }
        }
    }

    // Execute a request
    async execute(request){
        const command = '!weather '
        const args = request.content.substring(command.length).split(',')
        const city = {name: args[0], country: args[1] || 'fr'}
        try {
            const data =  await WeatherDatas.getData(city)
            const message = WeatherMessage.create(data)
            request.channel.send(message)
        } catch (e) {
            this.reject(request, e)
            throw e
        }
    }

    // Reject a request
    reject(message, issue){
        message.channel.send(issue)
    }
}

module.exports = Weatherbot