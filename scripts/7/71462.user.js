// ==UserScript==
// @name           BensBargains Expired Fader
// @namespace      guacamoly
// @description    Fades all expired deals to 25% and collapses the entry to just one line.  You can click on the faded entry restore it.
// @include        http://bensbargains.net/*
// ==/UserScript==

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
	//alert($); // check if the dollar (jquery) function works
	var hidelist = $('a:contains("Expired")').parent().parent().parent()
	hidelist.attr("style","height:20px;overflow:hidden;filter:alpha(opacity=25);-moz-opacity:0.25;-khtml-opacity:0.25;opacity:0.25;");
	hidelist.click ( function (){ 
		$(this).removeAttr("style"); 
	});
	
	
}

