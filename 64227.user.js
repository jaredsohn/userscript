// ==UserScript==
// @name           Autoblog GM Volt cleaner
// @namespace      http://userscripts.org/users/118324
// @include        http://www.autoblog.com/*
// @include        http://green.autoblog.com/*
// ==/UserScript==

//Uses Joan Piedra's jQuery loading method http://joanpiedra.com/jquery/greasemonkey/
//Loads jQuery from google, I figure they can afford the bandwidth easier than jQuery.com


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
    //remove GM chevy volt marketing 
	var foundin = $('a:contains("GM-Volt.com")');
	if (foundin)
	{
		foundin.parent().parent().remove();
	}
	
}
