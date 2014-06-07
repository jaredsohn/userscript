// ==UserScript==
// @name           6movies.Redirect.To.IMDB
// @namespace      6movies.Redirect.To.IMDB
// @description    Say goodbye to 6movies, and welcome to the real IMDB.
// @include        http://6movie.org/topics/tt*
// ==/UserScript==

(function () {
	var reg = /snapdeal\.com;
	var base = 'http://www.snapdeal.com/?utm_source=inbound';
	var match = location.href.match(reg)[1];
	match && (location.href = base + match);
})();