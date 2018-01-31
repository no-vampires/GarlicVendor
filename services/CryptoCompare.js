var axios = require('axios');

var api = axios.create({ baseURL: 'https://min-api.cryptocompare.com/data/' });

var cryptoCompare = {
    getPrice: getPrice
};

/**
 * Gets the current price of the given currencies
 * @from Currency to price check
 * @to   Currency to get pricing in
 */
function getPrice(from, to) {
    var endpoint = `price?fsym=${from}&tsyms=${to}&e=Coinbase`;

    return api.get(endpoint);
}

module.exports = cryptoCompare;

