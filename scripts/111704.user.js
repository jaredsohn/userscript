// ==UserScript==
// @name           4walled Direct Links
// @namespace      about:blank
// @description    Changes links in the 4walled gallery to direct links
// @include        http://4walled.org/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var scrolldelay;

function scrollStart() {
    	window.scrollTo(0, 10000);
	scrolldelay = setTimeout(scrollStart, 500);
}
function scrollStop() {
    	clearTimeout(scrolldelay);
	convertLinks();
}

function convertLinks()
{
	$("#imageList img").each(function() {
		old = $(this).attr("src").replace('/thumb/','/src/').replace('s.', '.');
		$(this).parent().attr('href', old);
	});
	alert('Ready for download. Use DownThemAll - firefox extension');
}

GM_registerMenuCommand ('Scroll - start', scrollStart);
GM_registerMenuCommand ('Scroll - stop & convert', scrollStop);