// ==UserScript==
// @name          jQuery + Print Links
// @namespace     http://www.joanpiedra.com/jquery/greasemonkey
// @description	  jQuery and Greasemonkey in order to print Links URLs
// @author        Joan Piedra + Bruno "Capi" Neyra
// @homepage      http://www.joanpiedra.com/jquery/greasemonkey + http://gedigi.net/merafalacia
// @include       *
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
	$('<h3 id="linklist-header">Link List</h3><ol id="linklist"></ol>').appendTo(document.body);
	$("a").each(function(i) {
		$(this).append('<span class="sup">'+(i+1)+'</span>');
		$("#linklist").append("<li>"+$(this).attr("href")+"</li>")
		});
	$(".sup").css({'font-size' : '60%', 'position' : 'relative', 'bottom' : '0.5em'});
}
