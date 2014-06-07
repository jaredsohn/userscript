// ==UserScript==
// @name           WIO
// @include        http://wp.pl/*
// @include	   http://www.onet.pl/*
// @include        http://www.interia.pl/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else	{
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}
GM_wait();
//code
function letsJQuery(){
	//$(function(){
		//wp
		//$('#wpTop').add($('#dynAdv08')).remove();
		//interia
		$('#ad_header').add($('#belka_760x30')).remove();
	//});
}
