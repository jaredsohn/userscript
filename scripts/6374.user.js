// ==UserScript==
// @name          Amazon Hiroshima City Library Linky
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Hiroshima City Library Lookup from Amazon book listings.
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
			spl_link.setAttribute('href', 'http://www.library.city.hiroshima.jp/cgi-bin/Sopcsken.sh?p_mode=1&g_mode=0&ryno=&c_key=&c_date=&list_cnt=10&mad_list_cnt=&brws=ncdet&ktyp9=shk%7Catk%7Cspk%7Ckek&itfg9=c&ser_type=0&stkb=&srsl1=1&srsl2=2&srsl3=3&ktyp0=shk&key0=&itfg0=c&ron0=a&ktyp1=atk&key1=&itfg1=c&ron1=a&ktyp2=spk&key2=&itfg2=c&ron2=a&ktyp3=kek&key3=&itfg3=c&ron3=a&ktyp4=kjk&key4=&itfg4=c&tgid=tyo%3A010A&sgid=spno&kkey=&skey=&srkbs=00&srkbs=10&srkbs=01%7C11&srkbs=02%7C12&srkbs=03%7C13&srkbs=21&srkbs=20&srkbs=30&srkbs=40&lckns=01&lckns=02&lckns=03&lckns=04&lckns=05&lckns=06&lckns=07&lckns=08&lckns=09&lckns=10&lckns=11&lckns=12&tkey=' + asin);
			spl_link.setAttribute('title', 'To Hiroshima City Library');
			spl_link.setAttribute('target', '_blank');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">>> Search Hiroshima City Library!</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}