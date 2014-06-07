// ==UserScript==
// @name           Mininova
// @namespace      http://phpirx.net/greasemonkey/minivona
// @description    Direct download torrent file from Mininova.com, instead view detail
// @author         H4ck3rx
// @version        0.1
// @include        http://mininova.com/*
// @include        http://*.mininova.com/*
// ==/UserScript==

(function() {

	var links = document.links;	
	if (!links) {
		return;
	}
	for (i=0; i<links.length; i++) {
		if(links[i].href.indexOf('/tor/')) {
			 links[i].href = links[i].href.replace(/\/tor\//ig,"/get/");
		}
	}	
})();
