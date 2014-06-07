// ==UserScript==
// @name           Wikipedia: Show French article link
// @namespace      http://code.google.com/p/ecmanaut/
// @description    For wikipedia pages on (not-fr).wikipedia.org, show the French title too in the page header.
// @updateURL      https://userscripts.org/scripts/source/115092.meta.js
// @include        http://*.wikipedia.org/wiki/*
// @include        http://*.wikipedia.org/w/*
// @exclude        http://fr.wikipedia.org/wiki/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        2.0
// ==/UserScript==

var header = $("h1");
var link = $(".interwiki-fr > a");
if (!link.length && header.length ) {
	header.append('<a style="float:right" href="' + document.URL.replace(/http:\/\/..\./, "http://fr.") + '">Rechercher en Français</a>');
}
else if (link && header) {
	link.each(function () {
		var href = $(this).attr('href');
		var title = $(this).attr('title');
		header.append('<a style="float:right" href="'+ href +'">'+ title +'</a>');
	} );
}