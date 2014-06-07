// ==UserScript==
// @name		   AgileZen Collapse Backlog
// @namespace	  http://userscripts.org/users/chillu
// @include		https://agilezen.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var _window = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;

// Check if jQuery's loaded
function GM_wait() {
	if(typeof _window.jQuery == 'undefined') { _window.setTimeout(GM_wait,100); }
	else { $ = _window.jQuery; init(); }
}
GM_wait();

// All your GM code must be inside this function
function init() {
	var css = '#backlogShade .shadeHeader small {font-size: 10px}';
	GM_addStyle(css);
	
	$('#backlogShade .shadeHeader').append('<small>(<a href="#" class="toggle">collapse</a>)</small>')
		.click(function(e) {
			$('#backlog .storyText').toggle();
			$(this).find('a').html($('#backlog .storyText').is(':visible') ? 'collapse' : 'expand');
		}).alert(this);
 }