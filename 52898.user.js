// ==UserScript==
// @name           Digg de-link summaries
// @namespace      http://ruhl.in
// @include        http://digg.com/*
// @version        1.0
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_log("wait for jquery");
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
		$("a.body").each(function(i, elem){
			var html = $(elem).html();
			$(elem).replaceWith("<span class='body'>" + html + "</span>");
		});
}
