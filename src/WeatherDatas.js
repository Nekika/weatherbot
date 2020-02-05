const axios = require('axios');
const config = require('./config');

const apiKey = config.owm.key;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&units=metric`;

module.exports = {
    getDatas: function (arg) {
        if (Number.parseInt(arg, 10)){
            return this.getByZipcode(arg)
        } else {
            return this.getByCityName(arg)
        }
    },
    getByZipcode(zipcode){
        const url = baseUrl + `&zip=${zipcode},fr`;
        return axios.get(url)
    },
    getByCityName(cityName){
        const url = baseUrl + `&q=${cityName},fr`;
        return axios.get(url)
    }
};