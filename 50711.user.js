// ==UserScript==
// @name			YouTube HD-fier
// @version			1.0.0
// @namespace		http://claude.betancourt.us/greasemonkey/youtube/hdfier/1.0.0
// @description		Modifies links to enable HD, when available.
// @include			http://www.youtube.com/*
// @license			(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

// Add jQuery
var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
GM_wait();

// Once document and jQuery are loaded
function GM_ready() {
	
	var selectors = [
		'.video-short-title a',
		'.video-mini-title a',
		'.clipper a'
	];
	
	HDify(selectors);
	
}

function HDify(selectors) {
	try {
		$.each(selectors,function(i,s){
			var l = $(s);
			$.each(l, function(i,a){
				a.href += '&fmt=18';
			});
		});
	} catch(e){}
}