// ==UserScript==
// @name          Amazon Hiroshima-Univ. Library Linky
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Hiroshima University Library Lookup from Amazon book listings.
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
			spl_link.setAttribute('href', 'http://opac.lib.hiroshima-u.ac.jp/scripts/mgwms32.dll?MGWLPN=F14&RTN=LINK%5EF14510&Key1=FL&Search=SEARCH&Word1=' + asin);
			spl_link.setAttribute('title', 'To Hiroshima University Library');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">>> Search Hiroshima University Library!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}