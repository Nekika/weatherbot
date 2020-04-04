const Discord = require('discord.js')

module.exports = {
    create: function (weatherdata) {
        return new Discord.RichEmbed()
            .setTitle(`Weather for ***${weatherdata.name}***`)
            .addField('\u200B', '\u200B')
            .setThumbnail(`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`)
            .addField(':thermometer: Temp', `${weatherdata.main.temp} °C`, true)
            .addField(':thermometer: Feeling', `${weatherdata.main.feels_like} °C`, true)
            .addField('\u200B', '\u200B')
            .addField(':wind_blowing_face:  Wind', `${weatherdata.wind.speed} km/h`, true)
            .addField(':droplet:  Humidity', `${weatherdata.main.humidity} %`, true)
    }
}