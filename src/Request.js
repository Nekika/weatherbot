module.exports = {
    isValid: function (request) {
        const regex = /^(!weather [a-zA-Z]+([ -_]?[a-zA-Z]+)*|!weather [0-9]{5})(,[a-zA-Z]{2,3})?$/
        return request.match(regex)
    }
};