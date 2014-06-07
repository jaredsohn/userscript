// amazonukeuroprices.user.js
// version 0.2
// 2005-04-25
// Copyright (c) 2005, Jim Lawton 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GMail Mark As Read Button", and click Uninstall.
//
// Based on the Amazon Local Currency script by Carl Henrik Lunde.
// Modified to fetch the currency rate dynamically from yahoo.com
// using code from Amazon Local Currency - Dynamic version by 
// Ori Avtalion (http://www.userscripts.org/scripts/show/1476).
// 
// ----------------------------------------------------------------------------
// WHAT IT DOES:
// Searches for any Sterling prices in the current page and adds a Euro
// equivalent. The exchange rate is fetched dynamically from yahoo.com 
// once per day. 
// ----------------------------------------------------------------------------
// HISTORY:
//  2005-04-25  0.1  Initial version.
//  2005-05-03  0.2  Modify to fetch exchange rate dynamically. Use Unicode for 
//                   Euro symbol. 
// ----------------------------------------------------------------------------

// ==UserScript==
// @name          Amazon UK Euro Prices
// @author        Jim Lawton <jim dot lawton at gmail dot com>
// @namespace     http://dunck.us/code/greasemonkey
// @description   Show amazon.co.uk prices in Euros. 
// @include       http*://*.amazon.co.uk/*
// @date          2005-11-25
// @version       0.2
// @GM_version    0.6.3
// ==/UserScript==

(function() {
    // Customize to fit:
    var currencyFrom = "GBP";
    var currencyToDefault = "EUR";
    var currencyFromSymbol = "\Â£";
    var currencyToSymbolDefault = "\u20AC";
    var decimalPlaces = 2;
    var prefixCurrencySymbol = true;
    var elnames = new Array("td", "font", "b", "span");
    var rounding = 10 ^ decimalPlaces;

    var rate = GM_getValue("currency_data");
    var lastRun = GM_getValue("last_run", "01/01/0001");
    var currencyTo = GM_getValue("currency_to", currencyToDefault);
    var todayDate = new Date();
    var todayString = todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear();
    var currencyToSymbol = GM_getValue("currency_symbol", currencyToSymbolDefault);

    if (rate == undefined || todayString != lastRun) {
        GM_log("Currency data is out-dated. Fetching new information...");
        getCurrencyData();
    } else {
        GM_log("Currency data is current. Converting...");
        convertCurrency();
    }

    function getCurrencyData()
    {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://finance.yahoo.com/d/quotes.csv?s=" + currencyFrom + currencyTo + "=X&f=l1&e=.csv",
            onload: function(responseDetails) {
                rate = responseDetails.responseText;
                GM_setValue("currency_data", rate);
                GM_setValue("last_run", todayString);
                GM_setValue("currency_to", currencyTo);
                GM_log("Rate: " + currencyFrom + "1 = " + currencyTo + " " + rate);
                convertCurrency();
            },
            onerror: function(responseDetails) {
                alert("Error fetching currency data");
            }
        });
    }
    
    // Convert currency.
    function convertCurrency() {
        for (elname in elnames) {
            var elems = document.getElementsByTagName(elnames[elname]);
    
            for (i=0; i<elems.length; ++i) {
                var price = elems[i];
    
                // Only modify text nodes
                if (price.firstChild && price.firstChild.nodeType == 3) {
                    var idx = price.firstChild.nodeValue.indexOf(currencyFromSymbol);
    
                    if (idx != -1/* && idx < 3 && price.innerHTML.length < 32*/) {
                        // Remove commas from original price
                        var originalAmount = price.firstChild.nodeValue.substr(idx + 1).replace(/,/g, "");
                        var amount = formatCurrency(parseFloat(originalAmount) * rate, rounding,
                                                    currencyToSymbol, prefixCurrencySymbol);
                        var container = document.createTextNode(" (" + amount + ")");
                        price.appendChild(container);
                    }
                }
            }
        }
    }
    
    function formatCurrency(num, rounding, symbol, prefix) {
        num = num.toString().replace(/\$|\,/g,'');
    
        if (isNaN(num))
            num = "0";
    
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * rounding + 0.50000000001);
        cents = num % rounding;
    
        num = Math.floor(num / rounding).toString();
        
        if (cents < 10) {
            cents = "0" + cents;
        }

        for (var i=0; i<Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length-(4*i+3));
        }

        if (prefix) {
            return (((sign)?'':'-') + symbol + num + '.' + cents);
        } else {
            return (((sign)?'':'-') + num + '.' + cents + symbol);
        }
    }
    
})();
