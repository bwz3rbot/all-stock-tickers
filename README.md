Simply require and call the asynchronous function to get a full list of tickers from https://stockanalysis.com/stocks/

```javascript
const tickerList = require('ticker-list');
(async () => {
    const tickers = await tickerList();
    console.log(tickers);
})();
```