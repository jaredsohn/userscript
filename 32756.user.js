// ==UserScript==
// @name           Soup-Pager
// @namespace      http://alphabeter.at/greasemonkey
// @description    Adds a link to the next page - just in case endless scrolling fails again. Or you want to continue permascrolling the next day, and don't want to see everyhing again. Or just hate Ajax-User-Interface-Anti-Feeling.
// @include        http://*.soup.io/*
// @include        http://soup.io/*
// ==/UserScript==

addEventListener('load', function(event) {	
	
	content_div=document.getElementById("more_history");	
	content_div.addEventListener ("DOMNodeInserted", insert, false);

		
	function insert() {

		content_div.removeEventListener ("DOMNodeInserted", insert, false);
		new_div = document.createElement("div");
		new_div.innerHTML = '<p style="text-align:right;width:100%"><a href="'+unsafeWindow.SOUP.Endless.next_url+'">Permalink to next page</a></p>';				
		content_div.insertBefore(new_div,content_div.lastChild);
		content_div.addEventListener ("DOMNodeInserted", insert, false);
	}
	
}, false);