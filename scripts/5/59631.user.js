// ==UserScript==
// @name           Maarten's magical birthday script!
// @description    Change a to aa. This is REALLY dumb
// @include        http://shacknews.com/laryn.x?*
// @include        http://*.shacknews.com/laryn.x?*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    strip_ellipses();
    
    $('.oneline > a').bind('click', strip_ellipses);
}

function strip_ellipses () {
	$('.postbody').each(function(a) {
		content = $(this).html();
		
		content = content.replace(/([^a])(a)([^a])/gi, '$1$2$2$3');
		
		$(this).html(content);
    });
    
    $('.oneline_body').each(function(a) {
		content = $(this).html();
		
		content = content.replace(/([^a])(a)([^a])/gi, '$1$2$2$3');
		
		$(this).html(content);
    });
}