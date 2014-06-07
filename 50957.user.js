// ==UserScript==
// @name           stackoverflow.com previous-next access keys
// @namespace      org.simplememes
// @description    adds 'p', 'n' access keys to stackoverflow.com
// @include        http://stackoverflow.com/*
// @require        http://jquery.com/src/jquery-latest.js
// ==/UserScript==

// Thank you to joanpiedra.com for the jquery+greasemonkey love.

// All your GM code must be inside this function
function letsJQuery() {
  $(".pager .prev").parent().attr("accesskey","p");
  $(".pager .next").parent().attr("accesskey","n");
}

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

