// ==UserScript==
// @name           drei-to_text2link
// @namespace      drei-to_text2link
// @include        http://*.drei.to/download/*/out.html
// ==/UserScript==

function query() {
	var n = document.getElementsByTagName('INPUT').length
	//alert(n);
	for (var i = 0; i < n; i++) {
		if (n-i < 8) {
			break;
		}
		var el = document.getElementsByTagName('INPUT')[i];
		GM_xmlhttpRequest({
			method: 'GET',
			url: el.getAttribute("value"),
			headers: {},
			onload: function(responseDetails) {
						var re = /<frame src="\/\?action=entryout_link&hash=(.*?)&/;
						re.exec(responseDetails.responseText);
						var link = RegExp.$1;
						var re = /<frame src="([^"]*?)" frameborder="0" \/>/;
						re.exec(responseDetails.responseText);
						var html = RegExp.$1;
						replace(link, html);
						}
		});
	}
}

function replace(link, dst) {
	var n = document.getElementsByTagName('INPUT').length
	for (var i = 0; i < n; i++) {
		if (n-i < 8) {
			break;
		}
		var el = document.getElementsByTagName('INPUT')[i];
		if (el.getAttribute("value").search(link) >= 0) {
			var linkEl = document.createElement("link");
			linkEl.innerHTML = '<a href="' + dst + '">' + dst + '</a><br>';
			el.parentNode.replaceChild(linkEl, el);
		}
	}
}

query();