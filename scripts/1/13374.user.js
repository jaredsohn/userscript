// ==UserScript==
// @name          amazon x mie_lib
// @namespace     http://d.hatena.ne.jp/samurai20000/
// @description	  amazon x mie_lib
// @include       http://*.amazon.*
// ==/UserScript==

libsearch();

function libsearch() {
    if (document.getElementById("ASIN")) {
	var asin = document.getElementById("ASIN").value;
    }

    if (asin.match(/(\d{9}[\d|X])/)){
	var header = document.evaluate("//div[@id='priceBlock']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (header) {
	    var spl_link = document.createElement('a');
	    spl_link.setAttribute('href', 'https://idx.milai.pref.mie.jp/MEPUTL/servlet/search.result?code_genre1=2&code_value1=' + asin );
	    spl_link.setAttribute('title', 'To Mie Libraries');
	    spl_link.innerHTML = '</br><span style=\"font-size:90%;background-color:#ffffcc;\">\u4E09\u91CD\u770C\u56F3\u66F8\u9928\u3067\u691C\u7D22</span>';
	    header.parentNode.insertBefore(spl_link, header.nextSibling);
	}
    }
}


