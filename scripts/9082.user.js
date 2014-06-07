// ==UserScript==
// @name           Moviemeter Imdb Redirecter
// @namespace      http://josdigital.com/blog/downloads/
// @description    Redirects moviemeter.nl pages to its corresponding imdb page.
// @include        http://www.moviemeter.nl/film/*
// @include        http://moviemeter.nl/film/*
// ==/UserScript==

(function() {

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
	var link = String(links[i]);
	if (link.indexOf('imdb.com/title/tt') != -1) {
		window.location.href = link;
		break;
	}
}

})();