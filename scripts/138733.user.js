// ==UserScript==
// @name            CPALead Bypass
// @namespace       http://gohostfree.com
// @description     Bypasses CPALead.com popup which blocks users from viewing content unless they fill out a survey at sites.
// @include         *
// ==/UserScript==

var cpalead = document.getElementById('cpalead');
if (cpalead) {
  cpalead.parentNode.removeChild(cpalead);
}

// thanks to chink255@hotmail.com
var overlay = document.getElementById('overlay');
if (overlay) {
  overlay.parentNode.removeChild(overlay);
}

unsafeWindow.dontscroll = function() {};