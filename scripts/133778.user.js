// ebay-less-ads.user.js
// Release 0.0.1 - adapted jquery init code from other userscripts
// 
// $Id: ebay-less-ads.user.js 130 2012-05-19 10:07:03Z knut $
// Copyright 2012, 2013 knb
//
// ==UserScript==
// @name          EbayLessAds
// @namespace     knbknb.greasemonkey.org/
// @description   Hide some ajax-based ads on ebay.com and ebay.de. As of September 2013, the script still removes animated ads from the right sidebar. The front page will still show some ads. 
// @include       http://www.ebay.de/
// @include       http://*.ebay.de/*
// @include       http://*.ebay.com/*

// ==/UserScript==
var jQy;
// Add jQuery
function importJs(url) {
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

// Check if jQuery is loaded
function jQueryWait() {
	if (typeof unsafeWindow.jQuery === 'undefined') {
		window.setTimeout(jQueryWait, 100);
	} else {
		// some other userscript may manipulate slashdot page with jQuery,
		// so assign to this global var instead of $ variable

		jQy = unsafeWindow.jQuery;

		main();

	}
}
jQueryWait();

// Here comes the main function, called by jQueryWait ;-)
function main() {
var elms = ["td.vi-is1-vtp", ".hpa-ad1",    "div.hpa-mb",
    "div.hpa-ad1",
    "div.hpa-bre",
    "div.hpa-mb",
    "hpa-blm",
    "hpa-blm1",
    "hpests",
    "#rtm_html_1602",
    "#abgc",
    "#RightPanel",
    "#google_image_div",
    ".topBannerAd",
    "#adchoice"
    
     
    ];
for (el in elms){
   jQy(elms[el]).hide();
 }
}
