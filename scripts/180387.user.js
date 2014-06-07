// ==UserScript==
// @name        Bitstamp Euro Tooltips
// @namespace   http://userscripts.org/users/coinft
// @description Shows Euro prices and amounts in tooltips on bitstamp.net.
// @copyright   2013, coinft
// @include     https://www.bitstamp.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.03
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==
//
// ==History==
// V1.03: Bug fix: Parse rate as float because the API now returns it as a string.
// V1.02: Cache rate in local storage to avoid hitting the lookup rate limit.
// V1.01: Fix negative amounts, and trim whitespace.
//
// ==Donate Bitcoins (any amount, I am happy about the token)==
// 14CjqiPTXRWwkJ7PxuiEmBQ6JE8XaChYip

function setup(eurusd) {
    function showEuro() {
      var text = $(this).text().trim(),
          sign = "";
      if (text.substr(0, 2) == "-$") {
        text = text.substr(1);
        sign = "-";
      }
      if (text.substr(0, 1) == "$") {
        var usd = text.substr(1).replace(",", ""),
            euro = "€ " + sign +
              (usd / eurusd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $(this).attr("title", euro);
      }
    }

    $(".top_bar .left .top_bar_list .last").removeClass("last");
    $(".top_bar .left .top_bar_list").append(
        '<li class="header last">EURUSD:</li><li>' +
        eurusd.toFixed(3) +
        '</li>');
    $("body").on("mouseenter", "* :not(:has(*))", showEuro);
}

function newRate() {
 GM_xmlhttpRequest({
  method: "GET",
  url: "http://rate-exchange.appspot.com/currency?from=EUR&to=USD",
  onload: function(response) {
    var respJSON = $.parseJSON(response.responseText),
        eurusd = parseFloat(respJSON.rate);
    console.log("new:", eurusd);
    if (eurusd) {
        setup(eurusd);
        GM_setValue("eurusd_rate", "" + eurusd);        
        GM_setValue("eurusd_expires", "" + (now + TIMEOUT*1000));
    }
  }
 });
}

var TIMEOUT = 7200,
    now = new Date().getTime(),
    eurusd = parseFloat(GM_getValue("eurusd_rate", "0.0")),
    expiry = parseInt(GM_getValue("eurusd_expires", "0"));

console.log("cached: " + eurusd, "valid for: " + (expiry-now));

if (!eurusd || (expiry - now < 0)) {
    //setup(1.355);
    newRate();
} else {
    setup(eurusd);
}
