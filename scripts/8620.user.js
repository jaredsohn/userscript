// ==UserScript==
// @name          IMDB Ratings for vcdquality.com
// @namespace     http://rapidsharedb.com
// @description   Shows IMDB rating next to movie rating
// @include       http://www.vcdquality.com/*
// @include       http://vcdquality.com/*
// ==/UserScript==

var links = document.evaluate(
	"//td[@class='no']/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	var regex = new RegExp("^http:\/\/.*?\.imdb\.com\/.itle..*?[0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$");
	if (regex.test(link.href)) {
		getRating(link);
	}
}

function getRating(link) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: link.href,
		onload: function (responseDetails) {
			if (responseDetails.status == 200) {
				var re = new RegExp("<b\\b[^>]*>[-+]?[0-9]*\\.?[0-9]+/[-+]?[0-9]*\\.?[0-9]+</b>");
				var m = re.exec(responseDetails.responseText);
				if (m != null) {
					link.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML += " " + m;
				}

			}
		}
	});
}