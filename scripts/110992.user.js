// ==UserScript==
// @name           Booking.com Euro converter
// @namespace      booking.com.currencyconverter
// @description    Shows the price in Euros after the USD/GBP/CAD/AUD price on Booking.com website.
// @include        http://www.booking.com/hotel/*
// @include        http://www.booking.com/searchresults*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @copyright      2011+, Alessio Periloso (http://www.periloso.it)
// @creator        Alessio Periloso
// @author         Alessio Periloso
// @attribution    Alessio Periloso (http://www.periloso.it)
// ==/UserScript==

/**
* This script is licensed under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Copyright © Alessio Periloso 2011+
**/


// Code

// Round to one decimal point
function roundC(v) {
	return Math.round(v*10)/10;
}

// Get all text nodes
pricesavail = document.evaluate(
	"//strong[@class='price availprice' or @class='price '] | " +	// For search results
	"//td[@class='roomPrice figure']/div/strong",					// For rooms
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

ConvertCurrencies(pricesavail);

function ConvertCurrencies(prices) {
	if (prices.snapshotLength>0) {
		node = prices.snapshotItem(0);  // This text node
		s = node.innerHTML.replace(/^\s+|\s+$/g,"").substring(0,3);  // The currency
		if (s == 'US$') s = "USD";
		if (s[0] != '€') {
			GM_xmlhttpRequest({
			  method: "GET",
			  url: "http://www.google.com/ig/calculator?hl=es&q=1" + s + "=?EUR",
			  onload: function(response) {
				var resp = eval('(' + response.responseText + ')');
				currency = parseFloat(resp.rhs);
				for (var i = 0; i < prices.snapshotLength; i++) {  // Loop through text nodes
					node = prices.snapshotItem(i);  // This text node
					s = node.innerHTML.replace(/^\s+|\s+$/g,"").replace('&nbsp;',' ');  // Its contents
					var Curr = parseFloat(s.substring(4));
					var myCurrency = currency * Curr;  // Convert
					s = '&euro; ' + myCurrency.toFixed(2) + '&nbsp;&nbsp;' + s;  // Replace
					node.innerHTML = s;  // Update text node
				}
			  }
			});
		}
	}
	return;
}