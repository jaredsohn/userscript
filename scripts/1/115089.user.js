// ==UserScript==
// @name           Wikipedia: Show English article title
// @namespace      http://code.google.com/p/ecmanaut/
// @description    For wikipedia pages on (not-en).wikipedia.org, show the English title too in the page header.
// @updateURL      https://userscripts.org/scripts/source/115089.meta.js
// @include        http://*.wikipedia.org/wiki/*
// @include        http://*.wikipedia.org/w/*
// @exclude        http://en.wikipedia.org/wiki/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        2.0
// ==/UserScript==

var header = $("h1");
var link = $(".interwiki-en > a");
if (!link.length && header.length ) {
	header.append('<a style="float:right" href="' + document.URL.replace(/http:\/\/..\./, "http://en.") + '">Search in English</a>');
}
else if (link && header) {
	link.each(function () {
		var href = $(this).attr('href');
		var title = $(this).attr('title');
		header.append('<a style="float:right" href="'+ href +'">'+ title +'</a>');
	} );
}