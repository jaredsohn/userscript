// ==UserScript==
// @name        Torrent z Filmweba
// @namespace   marooned/filmweb.pl
// @include     http://www.filmweb.pl/film/*
// @version     1
// @author      Marooned
// ==/UserScript==

var filmTitle = document.evaluate('//div[@class="filmTitle"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (filmTitle.snapshotLength) {
	var f = function searchTorrent() {
		var query = '';

		var originalTitle = document.evaluate('//div[@class="filmTitle"]/h2', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (originalTitle.snapshotLength) {
			query += originalTitle.snapshotItem(0).innerHTML.trim();
		} else {	//brak tłumaczenia
			originalTitle = document.evaluate('//div[@class="filmTitle"]//h1/a[@property="v:name"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (originalTitle.snapshotLength) {
				query += originalTitle.snapshotItem(0).innerHTML.trim();
			} else {
				alert('błąd w odczytywaniu tytułu (poprawić skrypt)');
				return;
			}
		}

		var year = document.getElementById('filmYear');
		if (year) {
			query += ' ' + year.innerHTML.trim().replace(/[()]/g, '');
		}

		return 'http://torrentz.eu/search?f=' + encodeURIComponent(query);
	};

	//add script to be used in onclick handler
	var element = document.createElement('a');
	element.setAttribute('href', f());
	element.setAttribute('style', 'margin-left: 10px');
	element.innerHTML = 'torrent';

	var wrapper = document.evaluate('//div[@class="filmTime"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	wrapper.snapshotItem(0).appendChild(element);
}