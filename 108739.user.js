// ==UserScript==
// @name           Wikipedia: Show Italian article title
// @namespace      http://code.google.com/p/ecmanaut/
// @description    For wikipedia pages on (not-it).wikipedia.org, show the Italian title too in the page header.
// @updateURL      https://userscripts.org/scripts/source/108739.meta.js
// @include        http://*.wikipedia.org/wiki/*
// @include        http://*.wikipedia.org/w/*
// @exclude        http://it.wikipedia.org/wiki/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        2.0
// ==/UserScript==

var header = $("h1");
var link = $(".interwiki-it > a");
if (!link.length && header.length ) {
	header.append('<a style="float:right" href="' + document.URL.replace(/http:\/\/..\./, "http://it.") + '">Cerca in Italiano</a>');
}
else if (link && header) {
	link.each(function () {
		var href = $(this).attr('href');
		var title = $(this).attr('title');
		header.append('<a style="float:right" href="'+ href +'">'+ title +'</a>');
	} );
}