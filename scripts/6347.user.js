// ==UserScript==
// @name          Amazon Hiroshima 3 libraries Linky
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Hiroshima Prefectural Library, Hiroshima City Library & Higashihiroshima City Library Lookup from Amazon book listings.
// @include       http://*.amazon.tld/*
// @version       1.1
// ==/UserScript==

libsearch();

function libsearch() {
	var asin = document.location.href.match(/\/(\d{9}[\d|X])(\/|$)/)[1];
	//var href = document.location.href;
	//var index = href.indexOf('product');
	//var asin = href.substring(index+8,index+18);
	if (asin){
		// var isbn = mainmatch[1];
		var header = document.evaluate("id('priceBlock')", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (location.host.match(/^astore/)){
			header = document.getElementsByTagName('h2')[0];
		}
		if (header) {
			var spl_link = document.createElement('a');
			spl_link.setAttribute('href', 'http://www4.hplibra.pref.hiroshima.jp/agent/servlet/books?Submit=%8C%9F+%8D%F5+%82%B7+%82%E9&title1=&title1r=1&title2=&title2r=1&title3=&title1m=1&title2m=1&title3m=1&author1=&author1m=1&publish=&class=&subject1=&subject2=&pubdate1=&pubdate2=&alllibraries=&libraries=kenritsu&libraries=easthiroshimacity&libraries=hiroshimacity&isbn=' + asin);
			spl_link.setAttribute('title', 'To Search Hiroshima 3 Libraries');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">>> Search Hiroshima 3 Libraries!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}