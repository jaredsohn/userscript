// ==UserScript==
// @name           Wikipedia ISBN to Amazon Link Converter
// @namespace      http://userscripts.org/users/126140
// @description    Converts ISBN Links on Wikipedia to link to the book's page on Amazon.com
// @include        http://*.wikipedia.org/*
// ==/UserScript==

var externalURL = "http://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-isbn={ISBN_PLACEHOLDER}&sort=relevancerank&Adv-Srch-Books-Submit.x=36&Adv-Srch-Books-Submit.y=18";

$ = unsafeWindow.jQuery;

$(document).ready(function () {
	$('a').each(function() {
		var linkLoc = $(this).attr('href');
		if(linkLoc != undefined && linkLoc.indexOf('/wiki/Special:BookSources') != -1) {
			var ISBN = linkLoc.substring(linkLoc.lastIndexOf('/') + 1);
			var isbnRegExp = /\{ISBN_PLACEHOLDER\}/ig;
			var newURL = externalURL.replace(isbnRegExp, ISBN);
			$(this).attr('href', newURL);
			$(this).attr('target', '_blank');
		}
	});
});