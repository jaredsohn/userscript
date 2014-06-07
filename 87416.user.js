// ==UserScript==
// @name           Title Youtube Locations
// @namespace      TYTLs
// @description    Forces all YouTube pages to put the video title in the Location Bar
// @include        http://*.youtube.*/*
// @include        http://youtube.*/*
// ==/UserScript==

// TODO: In case for some reason YouTube or another script redirects us to
// another URL which has lost the title param we added, we will re-run forever.
// To avoid this we should have a fallback.  E.g. if the title we want to set
// is the same as the last one we did set (via GM_set/getValue) then do not try
// again.

function getCGIParams() {
	var toParse = document.location.search.replace(/^\?[&]*/,'');
	var params = new Object();
	while (toParse.length) {
		var key = toParse.match(/^[^=]*/);
		toParse = toParse.replace(/^[^=]*=/,'');
		var value = toParse.match(/^[^&]*/);
		toParse = toParse.replace(/^[^&]*[&]*/,'');
		params[key] = decodeURIComponent(value);
	}
	return params;
}

var title = document.getElementsByTagName("h1")[0].textContent
	|| document.title.replace(/^YouTube - /,'')
	|| null;

if (title)
	title = title.replace(/ /g,'_').replace(/^[\r\n_]*/,'').replace(/[\r\n_]*$/,''); // "_"s paste better into IRC, since " "s become "%20"s which are hard to read.  The second and third parts trim "_"s and newlines from the start and end of the string.

if (document.location.pathname == "/watch") {
	if (title) {
		// GM_log("title="+title);
		/*
		var cgiParams = getCGIParams();
		if (cgiParams.title == null && document.location.href.search(/\?/)) {
			// document.location.replace(document.location.href + '&title=' + encodeURIComponent(title));
		}
		*/
		//// This is nicer.  In Firefox at least, it doesn't cause the page to reload.
		if (!document.location.href.match(/#/)) {
			document.location.replace(document.location.href + '#' + title);
		}
	}
}

