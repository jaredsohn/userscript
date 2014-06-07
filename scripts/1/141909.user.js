// ==UserScript==
// @name       Hide Twitter stats
// @namespace  http://jasonrobb.com
// @version    0.2
// @description  Hide stats on Twitter, because it doesn't matter how many followers you have.
// @match      https://*twitter.com/*
// @copyright  2012, Jason Robb
// ==/UserScript==

// .js-mini-profile-stats-container { display:none; }

function injectCSS() {
    var headTag = document.getElementsByTagName("head")[0].innerHTML;	
	var newCSS = headTag + '<style type="text/css">.js-mini-profile-stats-container, .stats.js-mini-profile-stats { display:none; }</style>';
	document.getElementsByTagName('head')[0].innerHTML += newCSS;
}

injectCSS();