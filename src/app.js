const axios = require('axios').default;
const cheerio = require('cheerio');

/* Get Stock Tickers from  stockanalysis.com */
const stocks = async () => {
    const res = await axios.get('https://stockanalysis.com/stocks/');
    const $ = cheerio.load(res.data);
    const list = $('ul.no-spacing');
    const li = list.find('li');
    const tickerList = [];
    li.each((i, el) => {
        const text = $(el).text().split(' - ');
        console.log(text);
        const ticker = text[0];
        const company = text[1];
        tickerList.push({
            ticker,
            company
        });
    });
    return tickerList;
}



/* Get Crypto Tickers from coinmarketcap.com */
const getCoinMarketCapListing = async (fromStart, limiter) => {
    return axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing', {
        headers: {
            Accept: '*/*'
        },
        params: {
            start: fromStart,
            limit: limiter,
            sortBy: 'market_cap',
            sortType: 'desc',
            convert: 'USD',
            cryptoType: 'all',
            tagType: 'all',
            audited: false,
        }
    });
}

const cryptos = async () => {
    let fromStart = 1;
    const limiter = 499;

    const cryptos = [];
    const listing = await getCoinMarketCapListing(fromStart, limiter);
    fromStart += listing.data.data.cryptoCurrencyList.length;
    for (const crypto of listing.data.data.cryptoCurrencyList) {
        cryptos.push(crypto);
    }
    const totalCountCryptos = parseInt(listing.data.data.totalCount);
    for (let i = fromStart; i <= totalCountCryptos; i += limiter) {
        let anotherListing;
        try {
            anotherListing = await getCoinMarketCapListing(fromStart, limiter);
        } catch (err) {
            console.error(err);
            return cryptos;
        }
        fromStart += listing.data.data.cryptoCurrencyList.length;
        for (const crypto of anotherListing.data.data.cryptoCurrencyList) {
            cryptos.push(crypto);
        }
    }
    return cryptos;
}

module.exports = {
    stocks,
    cryptos
}