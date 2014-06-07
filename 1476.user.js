/*
  GreaseMonkey userscript for showing prices in your local currency.
  Customize to your own currency below.

  Exchange rates provided by Yahoo @ www.yahoo.com

  New to GreaseMonkey? Visit <http://www.greasespot.net/>

  2005-04-17  Carl Henrik Lunde  chlunde+greasemonkey <at> ping.uio.no
              http://www.ping.uio.no/~chlunde/stuff

  Maintainer:
    Ori Avtalion  ori <at> avtalion.name

  Contributors:
    Simon Pope skjpope -> gmail.com
    United600  united600 <at> hotmail.com

  Changelog:

  2005-09-14
    * Added GM menu options to change the local currency coin and
      symbol.
    * Added price rounding.
    * Added option to toggle whether or not to display the
      local currency symbol.
    * Fixed double printing of converted currency

  2005-10-08
    * Fixed occasions where the price would show up several times
    * Prices are now converted even when they're part of a large sentence,
      such as in the check-out process ("total price is $42.13")

  2006-02-25
    * Added handling for prices that are not the first element in a tag,
      such as in amazon UK's wish list: <span><b>Price:</b>$13.37</span>

  2008-03-14
    * The converted price now appears right next to the original price.
    * All of the prices in a piece of text are converted, instead of just the first one.

  2008-15-12
    * Added support for Amazon.ca
    * The regex now matches 0 or more spaces after the currency symbol. Useful for amazon.ca
	  (I could just add the single space to the canadian dollar currency regex pattern, but
	  other websites might behave differently).

  2009-05-02
    * Added support for Amazon.de (Euros).
    * Refactored a bit to allow for different price parsers.

  2011-09-08
    * Added support for Amazon.fr, Amazon.it and Amazon.cn

  TODO:
    * Add GM menu options to change source currency
    * Add option and GUI to choose whether the local currency symbol
      should be prefixed or suffixed to the currency
	* Figure out the local currency automatically, so one would be able to use this script
	  on every website, even if it's using GBP on a .com domain
*/

// ==UserScript==
// @name          Amazon Local Currency - Dynamic version
// @namespace     http://userscripts.org/scripts/show/1476
// @description   Show prices in your local currency
// @include       http://www.amazon.com/*
// @include       https://www.amazon.com/*
// @include       http://amazon.com/*
// @include       https://amazon.com/*
// @include       http://www.amazon.co.uk/*
// @include       https://www.amazon.co.uk/*
// @include       http://amazon.co.uk/*
// @include       https://amazon.co.uk/*
// @include       http://www.amazon.ca/*
// @include       https://www.amazon.ca/*
// @include       http://amazon.ca/*
// @include       https://amazon.ca/*
// @include       http://www.amazon.de/*
// @include       https://www.amazon.de/*
// @include       http://amazon.de/*
// @include       https://amazon.de/*
// @include       http://www.amazon.fr/*
// @include       https://www.amazon.fr/*
// @include       http://amazon.fr/*
// @include       https://amazon.fr/*
// @include       http://www.amazon.it/*
// @include       https://www.amazon.it/*
// @include       http://amazon.it/*
// @include       https://amazon.it/*
// @include       http://www.amazon.co.jp/*
// @include       https://www.amazon.co.jp/*
// @include       http://amazon.co.jp/*
// @include       https://amazon.co.jp/*
// @include       http://www.amazon.cn/*
// @include       https://www.amazon.cn/*
// @include       http://amazon.cn/*
// @include       https://amazon.cn/*
// ==/UserScript==

(function() {

// Helper function. From the Prototype Javascript Framework:
String.prototype.endsWith = function (pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};

var amazonCurrencies = ["USD", "GBP", "CAD"];
var currencyFrom;


// Decimal separator:   .
// Thousands separator: ,
function regularPriceParser(price, currency) {
	return parseFloat(price.replace(/,/g, ""));
}

// Decimal separator:   ,
// Thousands separator: .
function europeanPriceParser(price, currency) {
	function replacer(character) {
		var translate = {".":"", ",":"."};
		return translate[character];
	}
	return regularPriceParser(price.replace(/[,.]/g, replacer), currency);
}

// priceRegex explanation:
// Match a string that begins with the symbol, and then
// has 0 or more spaces, digits, commas and periods, ending with a digit.
// The actual numeric price portion MUST BE enclosed in parentheses.

var currencies = {
	"USD" : {
		symbol: "$",
		priceRegex: /\$\s*([\d,.]+\d)/,
		parser: regularPriceParser
	},

	"GBP" : {
		symbol: "£",
		priceRegex: /£\s*([\d,.]+\d)/,
		parser: regularPriceParser
	},

	"CAD" : {
		symbol: "CDN$",
		priceRegex: /CDN\$\s*([\d,.]+\d)/,
		parser: regularPriceParser
	},

	"EUR" : {
		symbol: "EUR",
		priceRegex: /EUR\s*([\d,.]+\d)/,
		parser: europeanPriceParser
	},

	"JPY" : {
		symbol: "￥",
		priceRegex: /￥\s*([\d,.]+\d)/,
		parser: regularPriceParser
	},
	

	"CNY" : {
		symbol: "￥",
		priceRegex: /￥\s*([\d,.]+\d)/,
		parser: regularPriceParser
	}
};

// Check which Amazon we're at:
// amazon.com
if (document.domain.endsWith("com")) {
	currencyFrom = "USD";
// amazon.co.uk
} else if (document.domain.endsWith("co.uk")) {
	currencyFrom = "GBP";
// amazon.ca
} else if (document.domain.endsWith("ca")) {
	currencyFrom = "CAD";
// amazon.de
} else if (document.domain.endsWith("de")) {
	currencyFrom = "EUR";
// amazon.fr
} else if (document.domain.endsWith("fr")) {
	currencyFrom = "EUR";
// amazon.it
} else if (document.domain.endsWith("it")) {
	currencyFrom = "EUR";
// amazon.co.jp
} else if (document.domain.endsWith("jp")) {
	currencyFrom = "JPY";
// amazon.cn
} else if (document.domain.endsWith("cn")) {
	currencyFrom = "CNY";
} else {
	return;
}

// Configuration keys (not all of them)
var LAST_RUN = "last_run_";
var CURRENCY_RATE = "currency_rate_";

// Customize to fit:
// (Some options are modifiable from the GUI)
var currencyToDefault = "ILS";
var currencyToSymbolDefault = "NIS ";
var decimalPlaces = 2;
var prefixCurrencySymbol = true;

// Only traverse these elements
var elnames = ["td", "font", "b", "span", "strong", "div"];

var rounding = Math.pow(10, decimalPlaces);

// Check last run time
var rate = GM_getValue(CURRENCY_RATE + currencyFrom);
var lastRun = GM_getValue(LAST_RUN + currencyFrom, "01/01/0001");
var currencyTo = GM_getValue("currency_to", currencyToDefault);
var todayDate = new Date();
var todayString = todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear();
var currencyToSymbol = GM_getValue("currency_symbol", currencyToSymbolDefault);

// Function definitions

function fetchCurrencyData(coin, callback) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://download.finance.yahoo.com/d/quotes.csv?s=" + coin + currencyTo + "=X&f=l1&e=.csv",
		onload: function(responseDetails) {
			var rate = responseDetails.responseText.replace(/[\r\n]/g, "");
			GM_setValue(CURRENCY_RATE + coin, rate);
			GM_setValue(LAST_RUN + coin, todayString);
			callback();
		},
		onerror: function(responseDetails) {
			alert("Error fetching currency data for " + coin);
		}
	});
}

// Receives a price, and converts it. Returns "<original price> (<converted price>)"
function appendConversion(price, matched) {
	var originalPrice = currencies[currencyFrom].parser(matched, currencyFrom);

	if (isNaN(originalPrice)) {
		return price;
	}

	var converted = formatCurrency(originalPrice * rate, rounding,
		currencyToSymbol, prefixCurrencySymbol);

	return price + " (" + converted + ")";
}

function formatCurrency(num, rounding, symbol, prefix) {
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*rounding + 0.50000000001);
	cents = num % rounding;

	num = Math.floor(num / rounding).toString();

	if (cents < 10) {
		cents = "0" + cents;
	}

	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
		num = num.substring(0, num.length - (4 * i + 3)) + ',' +
		                       num.substring(num.length-(4*i+3));
	}

	if (prefix) {
		return (symbol + ((sign)?'':'-') + num + '.' + cents);
	} else {
		return (((sign)?'':'-') + num + '.' + cents + symbol);
	}
}

// Convert desired currency
function convertCurrency() {

	// Match a string that begins with the symbol, and then
	// has 0 or more spaces, digits, commas and periods, ending with a digit
	var currency = currencies[currencyFrom];

	var i,j,k;

	for (i = 0; i < elnames.length; ++i) {
		var elems = document.getElementsByTagName(elnames[i]);

		for (j = 0; j < elems.length; ++j) {
			var price = elems[j];

			for (k = 0; k < price.childNodes.length; ++k) {
				var currNode = price.childNodes[k];
				// Only modify text nodes
				if (currNode.nodeType == 3) {

					// Quick check before using the regex
					if (currNode.nodeValue.indexOf(currency.symbol) != -1) {
						// nbsp replacement done to fix some amazon.de prices (e.g. "EUR&nbsp;1,23")
						// GM_log(currNode.nodeValue.replace(/&nbsp;/, " "));
						currNode.nodeValue = currNode.nodeValue.replace(/&nbsp;/, " ").replace(currency.priceRegex, appendConversion);
					}
				}
			}
		}
	}
}


function setLocalCurrency() {
	var newCurrencyTo = prompt("Enter the code for your local currency (e.g. AUD, USD, ILS, etc.)", "");

	if (newCurrencyTo === "" || newCurrencyTo === null) {
		alert("Currency code is invalid. Please enter again");
		return;
	}

	// GM_log("Currency changed from " + currencyTo + " to " + newCurrencyTo);

	GM_setValue("currency_to", newCurrencyTo);
	currencyTo = newCurrencyTo;

	// Reset the various conversion rates
	for (var i = 0; i < amazonCurrencies.length; ++i) {
		GM_setValue(LAST_RUN + amazonCurrencies[i], "01/01/0001");
	}

	// Not really.. at this point, the fetching isn't done yet
	alert("Success! Refresh page to see the changes.");
}

function setLocalCurrencySymbol() {
	var newSymbol = prompt("Enter the symbol for your local currency ( e.g. A$, $, ¥, £, etc.)", "");

	if (newSymbol === '' || newSymbol === null) {
		alert("Symbol is invalid. Please enter again");
		return;
	}

	alert("Success! Refresh page to see the changes.");

	// GM_log("Currency Symbol changed from " + currencyToSymbol + " to " + newSymbol);

	GM_setValue("currency_symbol", newSymbol);
	currencyToSymbol = newSymbol;
}


GM_registerMenuCommand("Change Local Currency (" + currencyTo + ")", setLocalCurrency);
GM_registerMenuCommand("Change Local Currency Symbol (" + currencyToSymbol + ")", setLocalCurrencySymbol);


if (rate === undefined || todayString !== lastRun) {
	// GM_log("Currency data is out-dated. Fetching new information...");
	fetchCurrencyData(currencyFrom, function() {
		rate = GM_getValue(CURRENCY_RATE + currencyFrom);
		convertCurrency();
	});
} else {
	convertCurrency();
}

})();
