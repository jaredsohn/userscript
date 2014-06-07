// ==UserScript==
// @name      	DpStream script
// @namespace 	http://use.i.E.your.homepage/
// @version   	0.1
// @description	enter something useful
// @match     	http://www.dpstream.net/manga*
// @match		http://fr.dpstream.net/manga*
// @copyright 	2012+, You
// @require	  	http://code.jquery.com/jquery-1.9.0.min.js
// @grant		none
// ==/UserScript==

var pathname = decodeURI(window.location.pathname.substr(1, window.location.pathname.length - 6));
console.info(pathname);
var ElLinks = $('div#contenu > center > div > div:first > div:nth-child(2) > .tggm');
$(document).keyup(function(event) {
	console.info(pathname);
	var ElA = ElLinks.children('a[href*="'+pathname+'"]');
	var episodeNumber = parseInt(ElA.children('b').text());
	var episodeType = ElA.children('span').text();
	if ($.inArray(event.keyCode, [39, 37]) != -1) {
		var ElANext;
		if (event.keyCode == 39) ElANext = $('div#contenu > center > div > div:first > div:nth-child(2) > .tggm a[href*="'+('000'+(episodeNumber+1)).slice(-3)+' '+episodeType+'"]');
		if (event.keyCode == 37) ElANext = $('div#contenu > center > div > div:first > div:nth-child(2) > .tggm a[href*="'+('000'+(episodeNumber-1)).slice(-3)+' '+episodeType+'"]');
		if (ElANext) window.location.replace(ElANext.attr('href'));
	}
});
