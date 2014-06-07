// ==UserScript==
// @name        tsutaya stock
// @namespace   com.github.tomykaira
// @include     http://store.tsutaya.co.jp/item/rental_dvd/*
// @version     1
// ==/UserScript==

(function (){

    var forEach = Array.prototype.forEach;

    // Insert given html to the search result.
    // Use ads space on right, and override exisiting contents.
    function insertDOMs (doms) {
        var forEach = Array.prototype.forEach;
        var w = document.getElementById('pbBlock3600832');
        var sib;
		// w.innerHTML = "";
        forEach.call(doms, function(dom) { w.appendChild(dom); });
    }

    function htmlParser(aHTMLString){
        var range = document.createRange();
        return range.createContextualFragment(aHTMLString);
    }

    function insertStockResults (responseDetails){
        var dom = htmlParser(responseDetails.responseText);
        var stockBoxes = dom.querySelectorAll('div.tolShStkWrap');
        insertDOMs(stockBoxes);
    }

	function urlPath(url) {
		return new String(url).replace(/\?.*$/, '');
	}

	function fetchStockInfo(storeId) {
		var baseUrl = urlPath(document.location);
		var url = baseUrl + "?storeId=" + storeId;
		GM_log(url);
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html'
			},
			onload: insertStockResults,
			overrideMimeType: 'text/html'
		});
	}

	fetchStockInfo(2315);
	fetchStockInfo(2316);
}());
