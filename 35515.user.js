// ==UserScript==
// @name           xkcdgle
// @namespace      38-l.org
// @description    Replaces the Google logo with the latest XKCD comic.
// @include        http://www.google.tld/
// @include        http://google.tld/
// ==/UserScript==

// Match regex copied from "XKCD Preview" (http://userscripts.org/scripts/show/29846)

// Version 0.3 (17/05/2010)
//						- Minor code cleanup & change of comic location on page.
// Version 0.2 (29/12/2008)
//						- Fixed a bug that prevented the cache from updating on fresh installs.
// Version 0.1 (15/10/2008)
//						- Initial release

function getStrip() {
	GM_xmlhttpRequest({
		method : "GET",
		url : "http://www.xkcd.com/rss.xml",
		headers: { "User-agent": "Mozilla/4.0 (compatible; xkcdgle 0.1)" },
		onload: function(responseDetails) {
			if (responseDetails.status != 200) { return; }
			var match = responseDetails.responseText.match(/img src="(http:\/\/imgs\.xkcd\.com\/comics[^"]*?)"\s+title="([^"]*?)"\s+alt="([^"]*?)"/);
			var t = now.getTime();
			GM_setValue("comicSrc", match[1]);
			GM_setValue("comicTitle", match[2]);
			GM_setValue("cachedOn", t.toString());
			logo.src = match[1];
			logo.title = match[2];
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
