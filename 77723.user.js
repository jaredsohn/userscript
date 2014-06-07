// ==UserScript==
// @name          Bigger Inputs for PhpMyAdmin, edit
// @namespace     
// @description   Bigger Inputs for PhpMyAdmin, edit
// @include       https://*/3rdparty/phpMyAdmin/*
// @include       http://localhost/phpmyadmin/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
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
    //alert($); // check if the dollar (jquery) function works
	//alert(1);
	$('#sqlquery').css('height','333px');
}
