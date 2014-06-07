// ==UserScript==
// @name            CPALead Bypass
// @namespace       http://bloodycircuits.blogspot.com/
// @description     Bypasses CPALead.com popup which blocks users from viewing content unless they fill out a survey at sites such as watchitsalwayssunny.com and officeepisodesonline.com
// @include         http://watchitsalwayssunny.com/*
// @include         http://www.watchitsalwayssunny.com/*
// @include         http://officeepisodesonline.com/*
// @include         http://www.officeepisodesonline.com/*
// @include         http://www.leadpremiums.com/*
// ==/UserScript==

var cpalead = document.getElementById('cpalead');
if (cpalead) {
  cpalead.parentNode.removeChild(cpalead);
}

// thanks to akhild.akhild@gmail.com
var overlay = document.getElementById('overlay');
if (overlay) {
  overlay.parentNode.removeChild(overlay);
}

unsafeWindow.dontscroll = function() {};