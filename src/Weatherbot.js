const Discord = require('discord.js');
const Message = require('./Message');
const Request = require('./Request');
const Config = require('./config');
const WeatherDatas = require('./WeatherDatas');

module.exports = class Weatherbot extends Discord.Client{
    // Build a Weatherbot
    constructor() {
        super();
        this.token = Config.client.token;
    }

    // Indicates that the bot is connected to the server and set it's activity
    init(){
        console.log(`Logged in as ${this.user.tag}!`);
        this.user.setActivity('Type !weather | github.com/Nekika/weatherbot');
    }

    // Log the bot to the server
    login() {
        return super.login(this.token);
    }

    // Treat a request
    treat(message){
        const request = message.content;
        if (Request.isValid(request)){
            this.execute(message)
        } else {
            const issue = "Invalid request";
            this.reject(message, issue)
        }
    }

    // Execute a request
    execute(message){
        let datas = null;
        const split = message.content.split(' ');
        const arg = split[1];
        WeatherDatas.getDatas(arg)
            .then(response => {
                const weatherdatas = Message.format(response.data);
                this.send(message, weatherdatas)
            })
            .catch(error => {
                console.log(error);
                const issue = "Error retriving datas";
                this.reject(message, issue)
            })
    }

    // Reject a request
    reject(message, issue){
        message.channel.send('Error : ')
    }

    // Send a message containg weatherdatas
    send(message, weatherDatas){
        message.channel.send(weatherDatas)
    }
};