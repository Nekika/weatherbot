module.exports = {
    isValid: function (request) {
        const regex = /(^!weather [a-zA-Z]*$|^!weather [0-9]{5})$/
        if (request.match(regex)){
            return true
        }
        return false
    }
};