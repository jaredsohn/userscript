// ==UserScript==
// @name           YouTube Instant
// @namespace      http://mike.thedt.net
// @description    Makes the Youtube search feature behave like Google Instant (works only on the main page)
// @include        http://*.youtube.com/
// @include        http://*.youtube.com/*#q=*
// @version        1.3
// ==/UserScript==
var search = document.getElementById('masthead-search-term');
var timer;
var lastQuery;
function doSearch() {
	if (search.value!=lastQuery) {
		lastQuery = search.value;
		GM_xmlhttpRequest
		({
			method: 'GET',
			url: "http://www.youtube.com/results?search_query="+encodeURIComponent(search.value),
			onload: function(responseDetails) {
				var doc = document.createElement('div');
				doc.innerHTML = responseDetails.responseText.replace(/onload="tn_load\(\b\d+\b\);"/ig,''); //remove non-working javascript from results page
				var xpathExpression = '//*[@id="video_grid"]';
				var results = document.evaluate(xpathExpression, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);			

				document.getElementById("baseDiv").innerHTML='<div id="video_grid" class="list-view show-result-types">'+results.snapshotItem(0).innerHTML+'</div>';
				location.href="#q="+encodeURIComponent(lastQuery)
			}
		})
	}
}

function changed(e) {
	if (e.charCode!=0) {
		clearTimeout(timer);
		timer = setTimeout(function(){doSearch()},200);
	}
}

search.addEventListener("keypress", changed, true);

var q=location.href.split("#q=")[1];
if (q) {
	search.value=decodeURIComponent(q);
	doSearch();
}