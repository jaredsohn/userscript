// ==UserScript==
// @name        ytHtml5EKiss
// @namespace   robotnik
// @description YouTube the embedded HTML5 player
// @include     *
// @exclude     http*://*youtube.com/*
// @exclude     http*://*youtu.be/*
// @version     0.1.2
// @run-at      document-end
// @grant       none
// ==/UserScript==

/**
 * This script simply does some replacements and optionally disables autoplay.
 */

var opt = new function() {
	this.autoplay = false; // disable autoplay on all players converted
	this.rYT = /(youtube\.com|youtu\.be)\//i; // youtube source regexp
}

var iF = document.getElementsByTagName("iframe");

for (var i=0; i<iF.length; i++) {
	if (iF[i].src && opt.rYT.test(iF[i].src) && iF[i].src.indexOf('html5=') < 0)
	{
		iF[i].src += (iF[i].src.indexOf('?') != -1 ? '&' : '?') + 'html5=1';
		if (opt.autoplay === false) {
			iF[i].src = iF[i].src.replace('autoplay=1', 'autoplay=0');
		}
	}
	
}