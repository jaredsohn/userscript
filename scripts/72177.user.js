// ==UserScript==
// @name           New Remote Control Select
// @namespace      http://userscripts.org/users/86439
// @description    Allow selecting on target models
// @include        http://*dvdremotecontrols.com/*
// @include        http://*newremotecontrol.com/*
// @include        http://*newtvremotes.com/*
// @version	   1.0.2
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
	$(".bvale").css("-moz-user-select", "toggle");
	$(".bvale").css("-khtml-user-select", "toggle");
	$(".bvale").css("select", "toggle");
}
