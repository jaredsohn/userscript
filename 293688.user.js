// ==UserScript==
// @name        Cryptsy Worth Calculator
// @namespace   CoinFlare
// @description Shows worth of BTC in USD
// @include     https://www.cryptsy.com/*
// @version     2.3
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$("#usd-markets-top").attr('style','');
$("#leftusdlist").append('<li>BTC/USD<span id="btce_ticker" class="status pull-right">null</span></li><li><i>last price on BTC-e</i></li>');
$("#btc-total > ul:nth-child(1)").append('<li>USD Estimate<span id="usd_estimate" class="status pull-right">null</span></li>');

window.setInterval(accountEstimate, 3000);

GM_xmlhttpRequest({
    method: "GET",
    url: 'https://btc-e.com/api/2/btc_usd/ticker',
    onload: function(response) {
        var data = JSON.parse(response.responseText);
        var ticker = data.ticker.last;
        GM_setValue('ticker',ticker);
    }
});

function accountEstimate() {
    var ticker = GM_getValue('ticker');
    var BTC = $("#btc_total").text();
    var USD = "$" + (BTC * ticker).toFixed(2);
    $("#btce_ticker").text('$' + ticker);
    $("#usd_estimate").text(USD);
}
