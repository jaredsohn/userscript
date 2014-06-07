// ==UserScript==
// @author         madpit
// @name           rp.pl ad forward
// @include        *.feedsportal.*
// ==/UserScript==


var address = document.getElementsByTagName("a")[0].attributes.getNamedItem("href").value;

setTimeout("window.location='"+address+"'", 1);
