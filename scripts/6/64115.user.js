// ==UserScript==
// @name           Padding to prevent resizage
// @namespace      http://userscripts.org/users/121260
// @include        http://www.globulos.com/
// ==/UserScript==

// http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  $('body div#flashcontent embed').each(function(){
    $(this).css('height', '98%');
    $(this).css('width', '98%');
  });
}