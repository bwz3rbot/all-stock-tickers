const axios = require('axios').default;

const getListing = async (fromStart, limiter) => {
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

const getCryptos = async () => {
    let fromStart = 1;
    const limiter = 499;

    const cryptos = {
        totalCount: 0,
        cryptos: []
    };
    const listing = await getListing(fromStart, limiter);
    fromStart += listing.data.data.cryptoCurrencyList.length;
    for (const crypto of listing.data.data.cryptoCurrencyList) {
        cryptos.cryptos.push(crypto);
        cryptos.totalCount++;
    }
    const totalCountCryptos = parseInt(listing.data.data.totalCount);
    for (let i = fromStart; i <= totalCountCryptos; i += limiter) {
        let anotherListing;
        try {
            anotherListing = await getListing(fromStart, limiter);
        } catch (err) {
            console.log(err);
            return cryptos;
        }
        fromStart += listing.data.data.cryptoCurrencyList.length;
        for (const crypto of anotherListing.data.data.cryptoCurrencyList) {
            cryptos.cryptos.push(crypto);
            cryptos.totalCount++;
        }
    }
    return cryptos;
}

(async () => {
    const cryptos = await getCryptos();
    console.log(cryptos.totalCount);
})();