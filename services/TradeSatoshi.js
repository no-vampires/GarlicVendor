var axios = require('axios');

//Used to cutdown uris
var api = axios.create({ baseURL: 'https://tradesatoshi.com/api/public' });

var tradeSatoshi = {
    getCurrencies: getCurrencies,
    getTicker: getTicker,
    getMarketHistory: getMarketHistory,
    getMarketSummary: getMarketSummary,
    getMarketSummaries: getMarketSummaries,
    getOrderBook: getOrderBook
};


/** 
 * Gets list of currencies available on trade satoshi
 */
function getCurrencies() {
    var endpoint = 'getcurrencies';

    return api.get(endpoint);
}

/**
 * Gets the latest bid and ask price between two currencies given their short name
 * @param from The short name of the currency to convert from
 * @param to   The short name of the currency to convert to
 */
function getTicker(from, to) {
    var endpoint = 'getticker?' + marketString(from, to);

    return api.get(endpoint);
}

/**
 * Gets the market history between two currencies given their short name
 * @param from  The short name of the first currency 
 * @param to    The short name of the second currency
 * @param count Optional parameter to limit the amount of orders to fetch (default 20)
 */
function getMarketHistory(from, to, count) {
    count = count || 20;
    
    var market = marketString(from, to);
    var endpoint = `getmarkethistory?${marketString}&count=${count}`;

    return api.get(endpoint);
}

/**
 * Gets the current market summary between two currencies given their short names
 * @param from The short name of the first currency
 * @param to   The short name of the second currency
 */
function getMarketSummary(from, to) {
    var endpoint = 'getmarketsummary?' + marketString(from, to);

    return api.get(endpoint);
}

/**
 * Gets the current market summaries between all currencies
 */
function getMarketSummaries() {
    var endpoint = 'getmarketsummaries';

    return api.get(endpoint);
}

/**
 * Gets the current buy and/or sell orders between two currencies
 * @param from    The short name of the first currency
 * @param to      The short name of the second currency
 * @param options Optional parameter dictating what should be returned
 *     @param type  The type of orders to return buy, sell, or both (default both)
 *     @param depth The number of records that the call should return (default 20)
 */    
function getOrderBook(from, to, options) {
    var market = marketString(from, to);
    var type = options.type || 'both';
    var depth = options.depth || 20;
    var endpoint = `getorderbook?${market}&type=${type}&depth=${depth}`;

    return api.get(endpoint);
}


/**
 * Generates a market String based on the given currency short names
 * @param from The short name of the first currency
 * @param to   The short name of the second currency
 */
function marketString(from, to) {
    return 'market=' + from + '_' + to;
}

module.exports = tradeSatoshi;

