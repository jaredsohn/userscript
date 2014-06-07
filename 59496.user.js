// ==UserScript==
// @name           Tutorialized Header Remover
// @namespace      www.example.com
// @description    Removes the insanely sized header at the top of every tutorial.
// @include        http://www.tutorialized.com/view/tutorial/*
// ==/UserScript==
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait(){
	if(typeof unsafeWindow.jQuery == 'undefined')
		window.setTimeout(GM_wait,100); 
	else 
		$ = unsafeWindow.jQuery; letsJQuery();
}
GM_wait();

function letsJQuery() {
	// Fetch the tutorial frame source link
	var framesrc = $("frameset frame:last").attr("src");
	// Redirect to this page
	window.location.replace(framesrc);
}