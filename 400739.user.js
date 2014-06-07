// ==UserScript==
// @name       OKCoin
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.okcoin.com/
// @copyright  2012+, You
// ==/UserScript==

ltc = parseFloat(document.getElementById('bannerLtcLast').textContent);
btc = parseFloat(document.getElementById('bannerBtcLast').textContent);
rate = ltc / btc;

ltc_next = document.getElementById('bannerLtcLast').parentElement.nextElementSibling;
var node = document.createElement('li');
node.setAttribute('class', 'price white')
node.textContent = 'LTC/BTC: '
var span = document.createElement('span');
span.textContent = rate.toFixed(5);
node.appendChild(span);
ltc_next.insertBefore(node);

