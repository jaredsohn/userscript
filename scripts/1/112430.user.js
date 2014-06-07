// ==UserScript==
// @name          TwonkyMediaServer URL Swap
// @namespace     ---
// @description   Changes  TwonkyMediaServer link targets from lan ip to wan ip (e.g. dyndns) 
// @include       http://*
// @include       https://*
// ==/UserScript==
var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('192.168.178.100','yourdyndnsaccount.dyndns.org');
			
}

