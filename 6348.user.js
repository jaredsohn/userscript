// ==UserScript==
// @name          Amazon Tochigi Linky
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Tochigi Prefectural Library Lookup from Amazon book listings.
// @include       http://*.amazon.tld/*
// @version       1.4
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
			spl_link.setAttribute('href', 'http://soumoku.tochilib-unet.ocn.ne.jp/cgi-bin/Sopcsken.sh?srsl1=1&srsl2=2&srsl3=3&tgid=tyo%3A010A&tkey=' + asin);
			spl_link.setAttribute('title', 'To Tochigi Prefectural Library');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">>> Search Tochigi Prefectural Library!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}