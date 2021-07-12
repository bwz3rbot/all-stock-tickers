Fetch a full listing of stock tickers from https://stockanalysis.com/

Fetch a full listing of crypto tickers from https://coinmarketcap.com/

```javascript
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
```