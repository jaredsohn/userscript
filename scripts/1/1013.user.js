// ==UserScript==
// @name            Removes link adverts
// @namespace       http://www.pete-b.co.uk/downloads/greasemonkey
// @description     Removes the advert pages getting in the way of uComics strips
// @include         http://www.ucomics.com/*
// @include         http://ucomics.com/*
// ==/UserScript==

(function() {
	var links = document.getElementsByTagName("A");
	for(i=0; i<links.length; i++) {
		var link = links[i];
		if(link.getAttribute("onclick") == "this.href=FCx(this.href);") {
			link.setAttribute("onclick", "return true;");
		}
	}
})();