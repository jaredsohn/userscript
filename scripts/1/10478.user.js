// ==UserScript==
// @name          Amazon to Google Book Search Linky (English Ver.)
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  generates link from Amazon to Google Book Search
// @include       http://*.amazon.tld/*
// @version       1.1
// ==/UserScript==

libsearch();

function libsearch() {
	var asin10 = document.location.href.match(/\/(\d{9}[\d|X])(\/|$)/)[1];
	//var href = document.location.href;
	//var index = href.indexOf('product');
	//var asin10 = href.substring(index+8,index+18);
	if (asin10){
		// var isbn = mainmatch[1];
		var header = document.evaluate("id('priceBlock')", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (location.host.match(/^astore/)){
			header = document.getElementsByTagName('h2')[0];
		}
		if (header) {
			var spl_link = document.createElement('a');
			spl_link.setAttribute('href', 'http://books.google.com/books?q=isbn:' + asin10);
			spl_link.setAttribute('title', 'To Google Book Search');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffcccc;\">>> Google Book Search!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}
