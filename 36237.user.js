// ==UserScript==
// @name          Good IMDB Ratings (>= 7.2) for vcdquality.com
// @namespace     http://www.mozilla.org/
// @description   Shows IMDB rating (if greater or equal to 7.2) next to movie rating in a large red, bold font
// @include       http://www.vcdquality.com/*
// @include       http://vcdquality.com/*
// @include       http://www.vcdq.com/*
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
					m = String.substring(m, 3, 6);
					if(parseFloat(m) >= 7.2) {
						m = "<font color=\"red\" size=\"+1\">" + m + "</font>";
						link.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML += " " + m;
					}
				}

			}
		}
	});
}