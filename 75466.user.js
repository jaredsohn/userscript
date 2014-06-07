// ==UserScript==
// @name           SourceForge Header Wiki Hider
// @namespace      Tatsh
// @description    Hides the top header for SourceForge (and ads) permanently
// @include        https://sourceforge.net/apps/mediawiki/freeband2/index.php?title=Coding_standards&action=edit
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
  $("#sf_hd").hide();
  $("#sf_doc3").css({background: "transparent"});
}
