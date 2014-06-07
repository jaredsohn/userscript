// ==UserScript==
// @name           MudedeEternalizer
// @namespace      dandean.slog
// @include        http://slog.thestranger.com/*
// ==/UserScript==

var authors = document.querySelectorAll(".postedBy a[href*=author]");

for (var i=0; i<authors.length; i++) {
	var author = authors[i];

	if(author.innerHTML.match(/mudede/gi)) {
		var el = author;
		while (el.nodeName != "BODY" && !el.className.match(/blogPost/i)) {
			el = el.parentNode;
		}
		
		if (el.nodeName != "BODY" && el.parentNode.nodeName != "BODY") {
			el.parentNode.removeChild(el);
		}
	}
}