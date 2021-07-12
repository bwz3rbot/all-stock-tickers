const axios = require('axios').default;
const cheerio = require('cheerio');
module.exports = async () => {
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