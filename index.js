var tradeSatoshi  = require('./services/TradeSatoshi');
var cryptoCompare = require('./services/CryptoCompare');

var garlicVendor = {
    getGarlicPrice: getGarlicPrice
};

function getGarlicPrice() {
   
    var btcPrice = getGarlicPriceIn('BTC');
    var ltcPrice = getGarlicPriceIn('LTC');

    return Promise.all([btcPrice, ltcPrice])
	.then(function(results) {
	    return {
                'BTC': results[0],
		'LTC': results[1]
	    };
	});
}

function getGarlicPriceIn(currency) {
    var marketSummary = tradeSatoshi.getMarketSummary('GRLC', currency);
    var currencyPrice = cryptoCompare.getPrice(currency, 'USD');

    return Promise.all([marketSummary, currencyPrice])
        .then(function(results) {
	    return {
		exchange: results[0].data.result.last,
                price: results[1].data.USD
	    };
	})
	.catch(function(error) {
	    //Failed to call apis
	    return { exchange: 'N/A', price: 'N/A' };
	});
}

module.exports = garlicVendor;

