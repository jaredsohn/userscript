// ==UserScript==
// @name           wikipedia + google image search
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://*.wikipedia.org/wiki/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @version        0.3
// @date           2012053016
// ==/UserScript==

(function() {
if (getComputedStyle(document.getElementById('firstHeading'),"").display === "none")
	return;
var searchQuery = /wikipedia\.org\/wiki\/(.+)/.exec(location.href)[1];
var gurl = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=5&q=';
GM_xmlhttpRequest({
	method: "GET",
	url: gurl + searchQuery,
	headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
	onload: function(res) {
		var json = JSON.parse(res.responseText);
		var div = document.createElement('div');
		div.id = 'GM_div';
		for (var i = 0; i < json.responseData.results.length; i++) {
			var item = json.responseData.results[i];
			var img = document.createElement('img');
			img.src = item.tbUrl;
			var a = document.createElement('a');
			a.href = item.url;
			a.appendChild(img);
			div.appendChild(a);
		}
		var g = document.createElement('a');
		g.id = 'GM_g';
		g.href = json.responseData.cursor.moreResultsUrl;
		var f = document.createElement('img');
		f.src = 'http://www.google.com/favicon.ico';
		f.id = 'GM_f';
		g.appendChild(f);
		div.appendChild(g);
		var contentSub = document.getElementById('contentSub');
		contentSub.parentNode.insertBefore(div, contentSub);
	}
});
GM_addStyle('#GM_g, #GM_f {display: block; width: 16px;} #GM_div img:not(#GM_f) { width: 100px; margin: 0 5px;}');
})();
