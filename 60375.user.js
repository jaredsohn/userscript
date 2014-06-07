// ==UserScript==
// @name           Rapidshare Autodownload
// @namespace      PeanutButter
// @description    Automatically selects Free user and initiates the download after the timer is up.
// @include        *rapidshare.com/*
// @version        1.0.2
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}
GM_wait();

function letsJQuery() {
	$.noConflict();
	
	$().ready(function() {
		$('#ff').submit();
		
		setTimeout(function() {
			$('form[name="dlf"]').submit();
		}, 76000);
	});
	
}