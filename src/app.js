const axios = require('axios').default;
const cheerio = require('cheerio');

(async () => {
    const res = await axios.get('https://stockanalysis.com/stocks/');
    const $ = cheerio.load(res.data);
    const list = $('ul.no-spacing');
    const li = list.find('li');
    li.each((i, el) => {
        console.log($(el).text());
    });
})();