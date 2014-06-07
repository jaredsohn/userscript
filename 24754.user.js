// ==UserScript==
// @name           Liberty Quoter
// @namespace      http://www.holychao.com/userscripts/somethingawful/libertyquoter
// @description    Fight fiat quoting styles with purestrain quotes!
// @include        http://forums.somethingawful.com/*
// ==/UserScript==
var il = document.evaluate('//div[@class="bbc-block"]/h4', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var quotes = new Array();
var i = il.iterateNext();
while (i) { ni = il.iterateNext(); quotes.push(i); i = ni; }
for(var j = 0; j < quotes.length; j++) {
	quote = quotes[j];
	quote.style.color = '#000000';
}