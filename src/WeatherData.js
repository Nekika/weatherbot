const axios = require('axios');
const config = require('../config/API');

const apiKey = config.owm.key;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&units=metric`;

module.exports = {
    getData: async function (city) {
        const url = baseUrl + `&q=${city.name},${city.country}`.replace(/ /g, '%20')
        try {
            const res = await axios.get(url)
            return res.data
        } catch (e) {
            throw e
        }
    }
};