// ==UserScript==
// @name        Shortnews Ad-Free Links
// @namespace   de.theduffman.shortnews-ad-freelinks
// @include     http://www.shortnews.de/*
// @version     1
// @grant       none
// ==/UserScript==

$( ".newslink" ).each(function(i) {

	var href = $(this).attr('href');
	var equalPosition = href.indexOf('link=');
	var url = decodeURIComponent(href.substring(equalPosition + 5));

	$(this).attr('href', url)	
});