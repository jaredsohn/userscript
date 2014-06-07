// ==UserScript==
// @name        bitcointousd-silkroad
// @namespace   bitcoin
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// @include     http://silkroadvb5piz3r.onion/*
// @version     2
// ==/UserScript==

function get_timestamp() {
    return parseInt(new Date().getTime() / 1000);
}

function numberWithCommas(x) {
    // 12345 -> 12,345
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function inject_usd(rate) {
    // go through the document and append all instances of bitcoin with USD
    var rate = parseFloat(rate);
    var elements = $('.price_small, .price_big');
    elements.each(function(index, element) {
        var value = parseFloat($(element).text().substr(1).replace(",", ""));
        var new_value = numberWithCommas((value * rate).toFixed(2));
        usd = $("<span>").addClass('inUSD').text("$" + new_value);
        $(element).append(usd)
    });

    msg = $("<span>").text('Using ' + rate + " USD/BTC");
    $("#footer").prepend(msg);
}

var rate = GM_getValue('btc_usd');
var time = GM_getValue("btc_usd_time");
var expired = time + (60 * 60 * 3) < get_timestamp();

if(!rate || expired) {
    GM_xmlhttpRequest({
      method: "GET",
      url: 'https://mtgox.com/api/1/BTCUSD/ticker',
      onload: function(response) {
        var j = JSON.parse(response.responseText);
        rate = j['return']['buy']['value'];
        GM_setValue("btc_usd", rate)
        GM_setValue("btc_usd_time", get_timestamp())
        inject_usd(rate);
      }
    });
} else {
    inject_usd(rate);
}

GM_addStyle(".inUSD {color: green; clear: left;display: block;}");
