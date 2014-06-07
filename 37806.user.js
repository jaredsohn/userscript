// ==UserScript==
// @name          USD to AED prices
// @author        Mi
// @namespace     http://codomania.tumblr.com
// @description   Convert US Dollars to United Arab Emirates Dirhams
// @include       *
// @date          11-08-2008
// @version       2.0
// @GM_version    0.6.3
// ==/UserScript==

(function() {
    // Customize to fit:
    var currencyFrom = "USD";
    var currencyToDefault = "AED";
    var currencyFromSymbol = "\u0024";
    var currencyToSymbolDefault = "Dhs ";		//var currencyToSymbolDefault = "\u20AC";
	
    var decimalPlaces = 2;
    var prefixCurrencySymbol = true;
    var elnames = new Array("*");
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