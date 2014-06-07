// ==UserScript==
// @name		NNW O.Canada
// @namespace		https://twitter.com/jeremyw
// @description		Replace links on NationalNewsWatch to www.canada.com with links to o.canada.com
// @version		0.1
// @author		Jeremy Wiebe
// @include		http://www.nationalnewswatch.com/*
// ==/UserScript==

// I wrote this script because I prefer reading stories published on
// o.canada.com to stories published on its "Classic Edition" (www.canada.com),
// especially when using a mobile device. However, the aggregator National
// Newswatch tends to link to the latter.
//
// Unfortunately I wrote this before carefully investigating the capability for
// user scripts of Android browsers. At this time the only options are the
// Tampermonkey app, which is not very functional as a browser, and Opera 
// Mobile Labs with extensions support, which is nearly two years old, with 
// the Violentmonkey extension.
//
// Caveats: (1) This script replaces links by grabbing the first Google search
// result on o.canada.com for a given headline. Sometimes it grabs the wrong
// URL; usually it works. (2) The script uses the deprecated Google Web Search
// API, which limits users to 100 queries per day.
//
// 20140302

var wwwcanadaLnk = document.evaluate("//a[contains(@href,'www.canada.com')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i < wwwcanadaLnk.snapshotLength; i++) {
	var elem = wwwcanadaLnk.snapshotItem(i);
	var hedText;
	
	if (elem.innerHTML == "Read More") {
		var hedId = elem.parentNode.parentNode.id;
		hedText = document.evaluate("//a[contains(@href,'" + hedId + "')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.text;
	} else
		hedText = elem.text;
	
	if (hedText != "") {
		(function (e) {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + encodeURIComponent(hedText) + "%20site:o.canada.com",
				onload: function(responseDetails) {
					var r = JSON.parse(responseDetails.responseText);
					var ocUrl = r.responseData.results[0].url;
					e.setAttribute('href', ocUrl);
				}
			});
		})(elem);
	}
}
