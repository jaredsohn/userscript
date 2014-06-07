// ==UserScript==
// @name           Nuke digg iframe
// @namespace      http://crankycoder.com/digg.com
// @description    Nuke the iframe nonsense from digg when you click a link
// @include        http://digg.com/
// @include        http://digg.com/*
// ==/UserScript==

//
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
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
    var n;
    var nodes;
    nodes = $('a[title^="http"]');
    for (n in nodes) {
       $(nodes[n]).attr('href', $(nodes[n]).attr('title'));
    }
}