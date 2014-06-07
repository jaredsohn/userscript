// ==UserScript==
// @name                Ecologic Repubblica.it 24ore feeds
// @namespace           in_mattinata
// @description         Displays ONLY the article in pure html
// @include             http://www.repubblica.it/ultimora/24ore/nazionale/news-dettaglio/*
// ==/UserScript==

function eco(){

var mereArticle = document.evaluate(".//div[@class='articolo24ore']", document, null, XPathResult.ANY_TYPE, null).iterateNext();

var junk = document.documentElement;
junk.parentNode.replaceChild(mereArticle, junk);

}


eco();
//window.addEventListener('load', eco, true);
