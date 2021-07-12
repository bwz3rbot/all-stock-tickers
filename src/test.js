const {
    cryptos,
    stocks
} = require('./app');

(async () => {
    const stockTickers = await stocks();
    for (const ticker of stockTickers) {
        console.log(ticker);
    }
    const cryptoTickers = await cryptos();
    for (const crypto of cryptoTickers) {
        console.log(crypto);
    }
})();