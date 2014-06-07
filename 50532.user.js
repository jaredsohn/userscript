// ==UserScript==
// @name            CPALead Bypass
// @namespace       http://bloodycircuits.blogspot.com/
// @description     Bypasses CPALead.com popup which blocks users from viewing content unless they fill out a survey at sites such as watchitsalwayssunny.com and vidtomp3.com
// @include         http://vidtomp3.com/*
// ==/UserScript==

var cpalead = document.getElementById('cpalead');
if (cpalead) {
  cpalead.parentNode.removeChild(cpalead);
}

unsafeWindow.dontscroll = function() {};
