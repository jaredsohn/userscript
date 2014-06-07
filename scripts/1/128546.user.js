// ==UserScript==
// @name           6movies.Redirect.To.IMDB
// @namespace      6movies.Redirect.To.IMDB
// @description    Say goodbye to 6movies, and welcome to the real IMDB.
// @include        http://6movie.org/topics/tt*
// ==/UserScript==

(function () {
	var reg = /6movie\.org\/topics\/(tt\d+)/;
	var base = 'http://www.imdb.com/title/';
	var match = location.href.match(reg)[1];
	match && (location.href = base + match);
})();