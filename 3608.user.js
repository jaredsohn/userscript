// --------------------------------------------------------------------
//
// This is a Greasemonkey user script http://greasemonkey.mozdev.org/
// author: Winston Huang
// 2006-03-21
//
// ==UserScript==
// @name          Yahoo Finance and Google Finance Interchange. 
// @namespace     http://optimize-it.blogspot.com
// @description	  Add a link to Google Finance from Yahoo Finance page (next to the company name and symbol)
// @include       http://finance.yahoo.com/*
// ==/UserScript==

var href = window.location.href;

if (href.match(/^http:\/\/finance.yahoo.com\/q.*s=(\w+)/i)) {
    var symbol = RegExp.$1;
    var list = document.evaluate(
        "//td[@class='ygtb']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < list.snapshotLength; i++) {
        var element = list.snapshotItem(i);

        var small = document.createElement("small");
        element.appendChild(small);


        var googleLogo = document.createElement("img");
        googleLogo.setAttribute("src", "http://finance.google.com/finance/images/logo_finance.gif");
        googleLogo.setAttribute("alt", symbol + " on google finance");
        googleLogo.setAttribute("height", 15);
        googleLogo.setAttribute("width", 40);        

        var googleLink = document.createElement('a');
        googleLink.href="http://finance.google.com/finance?q=" + symbol;
        //        googleLink.appendChild(document.createTextNode(symbol + " on google finance"));
        googleLink.appendChild(googleLogo);

        small.appendChild(googleLink);
    }
}
