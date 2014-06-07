// ==UserScript==
// @name          Newzbin IMDB Ratings
// @description   Shows IMDB rating next to movie titles
// @include       http://*.newzbin.com/browse/cat/p/movies/*
// ==/UserScript==

var links = document.evaluate(
	"//tr[@class='new']/td[3]/a|//tr[@class='odd']/td[3]/a|//tr[@class='even']/td[3]/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	var regex = new RegExp("^http:\/\/(www)?.*imdb\.com\/title\/.+$");
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