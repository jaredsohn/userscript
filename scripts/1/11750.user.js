// ==UserScript==
// @name           Amazon + Netflix Merger
// @namespace      http://amazon.com/userscript
// @include        http://amazon.com/*
// @include		   http://www.amazon.com/*
// ==/UserScript==

var links = $x("/html/body/table[@id='navbarTabsTable']/tbody/tr/td/table/tbody/tr[@id='twotabtop']/td[3]/div/a");
if (links[0].textContent == "DVD") {

	// Store the old function.  We'll need to call it again later
	var old_amz_js_sendStars = unsafeWindow.amz_js_sendStars;

	// Our new function
	function GM_amz_js_sendStars(asin, ratingType) {

		var movieTitle = unsafeWindow.document.title;
		movieTitle = movieTitle.replace(/^Amazon\.com: /, "");
		while (movieTitle.match(/:.*/)) { movieTitle = movieTitle.replace(/:.*/, ""); }
		movieTitle = movieTitle.replace(/\(.*?\)/, "");
		var ratingValue = 'onetofive';

		rateOnNetflix(movieTitle);

		old_amz_js_sendStars(asin, ratingType, ratingValue); // call the old function
	}
}

// Write our new function into the old one
unsafeWindow.amz_js_sendStars = GM_amz_js_sendStars;

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function rateOnNetflix(movietitle) {
	var netflixURL = 'http://www.netflix.com/Search?v1=' + movieTitle;
	// we need to fetch the search page from netflix
	GM_xmlhttpRequest({
		method: 'GET',
		url: netflixURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
		},
		onload: function(rd) {
			var M_ID = rd.responseText;
			var movieid, trkid;
			if (M_ID.match(/www\.netflix\.com\/Movie\/.*?\/(\d+)\?trkid=(\d+)&strkid=.*?/)) {
				movieid = RegExp.$1;
				trkid = RegExp.$2;

				// fetch the netflix rater page
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.netflix.com/SetRating?foo=bar&foo=bar&widgetid=M'+movieid+'_'+trkid+'_5_0&value='+ratingType+'&url='+encodeURIComponent(netflixURL)+'&ncok=true',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
					},
					onload: function(rdi) { /* do nothing! */ },
					onerror: function(rdi) { /* do nothing! */ }
				});
			}
		},
		onerror: function(rd) {

		}
	});
}