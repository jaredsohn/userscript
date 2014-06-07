// ==UserScript==
// @name          amazon x rakutenbooks
// @namespace     http://d.hatena.ne.jp/samurai20000/
// @description	  amazon x rakutenbooks
// @include       http://*.amazon.*
// ==/UserScript==

rakuten_books_search();

function rakuten_books_search() {
    if (document.getElementById("ASIN")) {
	var asin = document.getElementById("ASIN").value;
    }

    var book = false;
    if (asin.match(/(\d{9}[\d|X])/)) book = true;

    if (!book) {
	GM_xmlhttpRequest({
	    method: 'GET',
 	    url:    'http://asin-jan.akitomo.org/tags/' + asin,
 	    onload: function(details) {
		jan = details.responseText.match(/(\d{13})/)[0];
		make_link(jan);
 	    }
	});
    } else {
	make_link(asin);
    }
    
    function make_link(key) {
	var header = document.evaluate("//div[@id='priceBlock']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (header) {
 	    var spl_link = document.createElement('a');
 	    spl_link.setAttribute('href', 'http://esearch.rakuten.co.jp/rms/sd/esearch/vc?sv=30&sitem=' + key );
 	    spl_link.setAttribute('title', 'go to rakuten books');
 	    spl_link.innerHTML = '</br><span style=\"font-size:90%;background-color:#ffffcc;\">\u697D\u5929books\u3067\u691C\u7D22</span>';
 	    header.parentNode.insertBefore(spl_link, header.nextSibling);
	}
    }
}

