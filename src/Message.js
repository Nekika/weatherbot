module.exports = {
    // Inspect a message sent by an user or another bot
    // If it starts by '!weather' it's a request
    inspect: function (message) {
        const regex = /^!weather .*/;
        if (message.content.match(regex)) {
            return 'request'
        }
        return null
    },

    format: function (weatherDatas) {
        const city = weatherDatas.name;
        const mood = weatherDatas.weather[0].id;
        const icon = this.getIcon(mood);
        const temp = weatherDatas.main.temp;
        const humidity = weatherDatas.main.humidity;

        return `Weather datas for ${city}
        
                           ${icon}
                     
                     :thermometer: ${temp}°C
                     
                     :droplet: ${humidity} %`
    },

    getIcon(mood){
        switch (mood) {
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
                return ':cloud_lightning';
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 520:
            case 521:
            case 522:
            case 531:
                return ':cloud_rain:';
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
                return ':white_sun_rain:';
            case 511:
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
            case 613:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                return ':snowflake:';
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                return ':fog:';
            case 800:
                return ':sunny:';
            case 801:
                return ':partly_sunny:';
            case 802:
            case 803:
            case 804:
                return ':cloud:';

        }
    }
}