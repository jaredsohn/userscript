// ==UserScript==
// @name           Explogle
// @namespace      38-l.org
// @description    Adds the latest Cyanide & Happiness comic to the google home page.
// @include        http://www.google.tld/
// @include        http://google.tld/
// ==/UserScript==

function getStrip() {
	GM_xmlhttpRequest({
		method : "GET",
		url : "http://www.explosm.net/comics/new/",
		headers: { "User-agent": "Mozilla/4.0 (compatible; Explogle 0.1)" },
		onload: function(responseDetails) {
			if (responseDetails.status != 200) { return; }
			var match = responseDetails.responseText.match(/src="(http:\/\/www\.explosm\.net\/db\/files\/Comics[^"]*?)"/);
			var t = now.getTime();
			GM_setValue("comicSrc", match[1]);
			GM_setValue("cachedOn", t.toString());
			comic.src = match[1];
		}
	});
}

var now = new Date();
var cachedOn = parseInt(GM_getValue("cachedOn", "0"));
var comic = document.createElement('img');

if (cachedOn == 0 || (now.getTime() - cachedOn) > ((1000 * 60) * 60)) { getStrip(); } //Only update once every hour.
else {
	comic.src = GM_getValue("comicSrc");
}

document.getElementById('body').appendChild(document.createElement('p').appendChild(comic));
