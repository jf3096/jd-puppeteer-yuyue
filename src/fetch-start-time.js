const axios = require('axios');

const fetchStartTime = async (skuId) => {
  const html = await axios.get(`https://item.m.jd.com/product/${skuId}.html`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3823.400 QQBrowser/10.7.4307.400'
    }
  }).then(response => response.data);
  const yueEtimeRegex = /"yueEtime":"([^"]+)?"/
  const matches = html.match(yueEtimeRegex);
  return matches && matches[1];
}

module.exports = fetchStartTime;
