// ==UserScript==
// @name           HAI catalog
// @author        Reem Bar
// @namespace      http://snark.co.il
// @description   HAI Aleph catalog: convert new window javascript links to regular links
// @include        http://132.74.59.101/*
// @include        http://aleph.haifa.ac.il/*
// @include        http://aleph1.libnet.ac.il/*
// ==/UserScript==

(
function () {
	// get all links on page
	var pglinks = document.links;
	// step throught the links one by one
	for (var i=0; i<pglinks.length; i++){
		// check to make sure it is a link, and not an anchor
		if (pglinks[i].href) {
			// kill the javascript links
			if (pglinks[i].href.match(/^javascript:open_window\(".*"\);$/i)) {
			pglinks[i].href = pglinks[i].href.replace(/^javascript:open_window\("(.*)"\);$/i,"$1");
			}
		}
	}
}
)();
