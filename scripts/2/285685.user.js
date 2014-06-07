// ==UserScript==
// @id            amazon-ee7b5e12-99c2-4b10-acb1-04fb0ba98ab0@CzBiX
// @name          Amazon Local Currency
// @version       1.1
// @namespace     CzBiX
// @author        CzBiX <gliuwr@gmail.com> http://czbix.com
// @description   Show prices in amazon with your local currency
// @include       /^https?:\/\/(www\.)?amazon.(com|co\.uk|ca|de|fr|it|co\.jp|cn)\//i
// @icon           https://s3.amazonaws.com/uso_ss/icon/285685/large.png?1389716903
// @homepage       https://userscripts.org/scripts/show/285685
// @updateURL      https://userscripts.org/scripts/source/285685.meta.js
// @downloadURL    https://userscripts.org/scripts/source/285685.user.js
// @run-at        document-end
// ==/UserScript==

(function() {
// Customize to fit:
var decimalPlaces = 2;
var prefixCurrencySymbol = true;
var rateExpireHours = 24;

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


var currencyFrom;
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
  console.log("unknown amazon site: " + document.domain);
  return;
}

// Configuration keys (not all of them)
var LAST_RUN = "last_run_";
var CURRENCY_RATE = "currency_rate_";
var CURRENCY_TO = "currency_to";
var CURRENCY_SYMBOL = "currency_symbol";

// Only traverse these elements
var ELNAMES = ["td", "font", "b", "span", "strong", "div"];

// Function definitions
function fetchCurrencyData(coin, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://download.finance.yahoo.com/d/quotes.csv?s=" + coin + currencyTo + "=X&f=l1&e=.csv",
    onload: function(responseDetails) {
      var rate = parseFloat(responseDetails.responseText.replace(/[\r\n]/g, ""));
      callback(rate);
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

  var converted = formatCurrency(originalPrice * rate, currencyToSymbol, prefixCurrencySymbol);

  return price + " (" + converted + ")";
}

function formatCurrency(num, symbol, prefix) {
  var numStr = num.toFixed(decimalPlaces).toLocaleString();

  if (prefix) {
    return symbol + numStr;
  } else {
    return numStr + symbol;
  }
}

// Convert desired currency
function convertCurrency() {

  // Match a string that begins with the symbol, and then
  // has 0 or more spaces, digits, commas and periods, ending with a digit
  var currency = currencies[currencyFrom];

  var i,j,k;

  for (i = 0; i < ELNAMES.length; ++i) {
    var elems = document.getElementsByTagName(ELNAMES[i]);

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
  var newCurrencyTo = prompt("Enter the code for your local currency (e.g. AUD, USD, ILS, etc.)", currencyTo);

  if (newCurrencyTo === "" || newCurrencyTo === null) {
    alert("Currency code is invalid. Please enter again");
    return;
  }

  GM_setValue(CURRENCY_TO, newCurrencyTo);

  // Reset the various conversion rates
  var allConfig = GM_listValues();
  for (var i = 0; i < allConfig.length; i++) {
    var key = allConfig[i];
    if (key.startsWith(LAST_RUN)) GM_deleteValue(key);
  }

  // Not really.. at this point, the fetching isn't done yet
  alert("Success! Refresh page to see the changes.");
}

function setLocalCurrencySymbol() {
  var newSymbol = prompt("Enter the symbol for your local currency ( e.g. A$, $, ¥, £, etc.)", currencyToSymbol);

  if (newSymbol === '' || newSymbol === null) {
    alert("Currency code is invalid. Please enter again");
    return;
  }

  GM_setValue(CURRENCY_SYMBOL, newSymbol);

  alert("Success! Refresh page to see the changes.");
}


var currencyTo = GM_getValue(CURRENCY_TO, "USD");
var currencyToSymbol = GM_getValue(CURRENCY_SYMBOL, "$");

GM_registerMenuCommand("Change Local Currency (" + currencyTo + ")", setLocalCurrency);
GM_registerMenuCommand("Change Local Currency Symbol (" + currencyToSymbol + ")", setLocalCurrencySymbol);

if (currencyTo === currencyFrom) {
  console.log("local amazon, skip to run");
  return;
}

// Check last run time
var rate = GM_getValue(CURRENCY_RATE + currencyFrom, -1);
var lastRun = new Date(GM_getValue(LAST_RUN + currencyFrom, "01/01/0001"));
var nowDate = new Date();

var rateExpireTime = new Date(0).setHours(rateExpireHours);
if (rate <= 0 || (nowDate - lastRun) >  rateExpireTime) {
  console.debug("Currency data is out-dated. Fetching new information...");
  fetchCurrencyData(currencyFrom, function(newRate) {
    GM_setValue(CURRENCY_RATE + currencyFrom, newRate.toString());
    GM_setValue(LAST_RUN + currencyFrom, nowDate.toUTCString());
    rate = newRate;
    convertCurrency();
  });
} else {
  convertCurrency();
}

})();
