// ==UserScript==
// @name           mein.kreditkartenportal.at - make login usable (lessens the pains of loggin in :-) )
// @namespace      www.anorak.io
// @description    login form submit button is disabled by default - only god knows why
// @version        0.1
// @include        https://mein.kreditkartenportal.at/*
// ==/UserScript==

//var adBar = document.getElementById('kartennummer');
//adBar.style.display = 'none';

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
	$("#submitB").removeAttr("disabled");
	$("#radioMc").remove();
	$("#radioVisa").remove();
}