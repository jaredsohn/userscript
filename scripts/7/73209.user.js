// ==UserScript==
// @name           No more iPad
// @namespace      http://userscripts.org/users/109416
// @description    Removes posts about the iPad from gizmodo.com
// @include        http://gizmodo.com/
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
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
	
		$(".post").each(function (){
			if($(this).find(".content h1").text().indexOf("iPad") > 0)
				$(this).hide();
		});
	
}
