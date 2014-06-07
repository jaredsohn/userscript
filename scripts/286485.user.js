// ==UserScript==
// @name       Norwegian currency converter
// @namespace  http://www.smavik.no/
// @version    1.2
// @description  Converts USD, GBP, CAD, AUD and EUR to NOK.
// @downloadURL   https://userscripts.org/scripts/source/286485.user.js
// @updateURL     http://userscripts.org.nyud.net/scripts/source/286485.meta.js
// @match      http://*.co.uk/*
// @match      http://*.com/*
// @match      http://*.net/*
// @copyright  2014+, Aina Småvik
// ==/UserScript==

var myCurrencyCode = GM_getValue("currencycode", "NOK");
var myCurrencyFriendly = GM_getValue("currencyfriendly", "kr");
GM_setValue("currencycode", myCurrencyCode);
GM_setValue("currencyfriendly", myCurrencyFriendly);

var now = new Date().getTime();
var LastUpdate = parseInt(GM_getValue('Update', 0));
if (now > LastUpdate + 24*60*60*1000) {
    GM_setValue('Update',now+"");
    var Currency = new Array("USD","GBP","CAD","AUD","EUR");
    for (var i = 0; i < Currency.length; i++) {
        var convertionURL = "http://download.finance.yahoo.com/d/quotes.csv?s="+encodeURIComponent(Currency[i]+myCurrencyCode+"=X")+"&f=l1";
        GetRatio(convertionURL,Currency[i]);
    }
}

// Exchange rates
var perUSD = parseFloat(GM_getValue('USD',0));
var perGBP = parseFloat(GM_getValue('GBP',0));
var perCAD = parseFloat(GM_getValue('CAD',0));
var perAUD = parseFloat(GM_getValue('AUD',0));
var perEUR = parseFloat(GM_getValue('EUR',0));

// Round to one decimal point
function roundC(v) {
    return Math.round(v*10)/10;
}

// Get all text nodes
var textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    var node = textnodes.snapshotItem(i);
    var s = node.data;
    
    if (s.match(/GBP\s+[\d,]+\.\d+/)) {
        s = replaceCurrency(s, /(.*GBP\s+)([\d,]+\.\d+)(.*)/, /(GBP\s+)([\d,]+\.\d+)/, perGBP);
        
    }  else if (s.match(/£[\d,]+\.\d+/)) {
        s = replaceCurrency(s, /(.*£)([\d,]+\.\d+)(.*)/, /(£)([\d,]+\.\d+)/, perGBP);
        
    } else if (s.match(/C \$[\d,]+\.\d+/)) {
        s = replaceCurrency(s, /(.*C \$)([\d,]+\.\d+)(.*)/, /(C \$)([\d,]+\.\d+)/, perCAD);
        
    } else if (s.match(/AU \$[\d,]+\.\d+/)) {
        s = replaceCurrency(s, /(.*AU \$)([\d,]+\.\d+)(.*)/, /(AU \$)([\d,]+\.\d+)/, perAUD);
        
    } else if (s.match(/\€[\d,]+\.\d+/)) {
        s = replaceCurrency(s, /(\€)([\d,]+\.\d+)(.*)/, /(\€)([\d,]+\.\d+)/, perEUR, /,/, '');
        
    } else if (s.match(/US \$[\d,]+\.\d+/)) { // US $99.99
        s = replaceCurrency(s, /(.*US \$)([\d,]+\.\d+)(.*)/, /(US \$)([\d,]+\.\d+)/, perUSD, /,/, '');
        
    } else if (s.match(/\$[\d,]+\-\d+/)) { // $99-99
        s = replaceCurrency(s, /(.*\$)([\d,]+\-\d+)(.*)/, /(\$)([\d,]+\-\d+)/, perUSD, /\-/, '.');

    }  else if (s.match(/US\$[\d,]+,\d+/)) { // dx.com US$99,99
        s = replaceCurrency(s, /(.*US\$)([\d,]+,\d+)(.*)/, /(.*US\$)([\d,]+,\d+)(.*)/, perUSD, /,/, '.');
        
    } else if (s.match(/\$[\d,]+\.\d+/)) { // $99.99
        s = replaceCurrency(s, /(.*\$)([\d,]+\.\d+)(.*)/, /(\$)([\d,]+\.\d+)/, perUSD);
    }
        
        node.data = s;    
}

function replaceCurrency(string, regexFind, regexReplace, rate, replace, replacewith) {
    var currencyValue = string.replace(regexFind, '$2').trim();
    if (replace) {
        currencyValue = currencyValue.replace(replace, replacewith);
    }
    var myCurrency = currencyValue * rate;
    return string.replace(regexReplace, '$1$2 ('+ myCurrency.toFixed(2).replace(/\./, ',') + myCurrencyFriendly + ')'); 
}

function GetRatio(link,CurrentCurrency) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: link,
        onload: function(responseDetails) {
            GM_setValue(CurrentCurrency,responseDetails.responseText.replace(/\s+$/,""));
        } 
    });
}