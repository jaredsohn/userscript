// ==UserScript==
// @name           agentlead ellipsis remover
// @namespace      agentleadellipsis
// @description    remove ellipses
// @include        http://shacknews.com/chatty*
// @include        http://*.shacknews.com/chatty*
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
    
    $('.olauthor_171860 > a').bind('click', strip_ellipses);
}

function strip_ellipses () {
	$('.fpauthor_171860 > .postbody').each(function(a) {
		content = $(this).html();
		
		content = content.replace(/(\w)\s+\.{2,}(\w)/gm, '$1, $2'); // Replace 'blah ....blah' with 'blah, blah'
		content = content.replace(/\.{2,}(\w)/gm, '. $1');          // Replace '....Blah' with '. Blah'
		content = content.replace(/\.{2,}/gm, '.');        	     // Replace all other ellipses with one period
		
		$(this).html(content);
    });
    
    $('.olauthor_171860 > a > .oneline_body').each(function(a) {
		content = $(this).html();
		
		content = content.replace(/(\w)\s+\.{2,}(\w)/gm, '$1, $2'); // Replace 'blah ....blah' with 'blah, blah'
		content = content.replace(/\.{2,}(\w)/gm, '. $1');          // Replace '....Blah' with '. Blah'
		content = content.replace(/\.{2,}/gm, '.');        	     // Replace all other ellipses with one periodd
		
		$(this).html(content);
    });
}