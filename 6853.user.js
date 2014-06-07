// ==UserScript==
// @name          Amazon Kita City Library Linky
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Kita City Library Lookup from Amazon book listings.
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
			spl_link.setAttribute('href', 'http://www.library.city.kita.tokyo.jp/KTWLIB/servlet/search.result?data_division1=dummy&library_name1=dummy&code_genre1=2&code_value1=' + asin);
			spl_link.setAttribute('title', 'To Kita City Library');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">>> Search Kita City Library!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}
