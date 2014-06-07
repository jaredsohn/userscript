// ==UserScript==
// @name        Buy Stocks
// @namespace   userscripts.org
// @description Fills in 1000 shares on Buy Stocks page
// @include     http://www.neopets.com/stockmarket.phtml?type=buy*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("input[name=amount_shares]").val('1000');