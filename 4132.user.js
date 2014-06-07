// Remove some stuff from Onvista.de pages
// Release 0.0.4
// 
//
// $Id: minimalonvista.user.js 101 2010-07-01 20:52:13Z knut $
//
// About: Removes leftmost, ads-laden column and  "news" column from finance portal "www.onvista.de"
// May need a little startup time (a few seconds on my machine)
// Does NOT remove big banner ads- let another banner filter such as privoxy do that.

// ==UserScript==
// @name          MinimalOnvista
// @namespace     knbknb.greasemonkey.org/
// @description   Cleanup the finance portal www.onvista.de: Get rid of some layout elements (columns with junk info, and ads). Some startup time required.
// @include       http://*.onvista.de*
// ==/UserScript==

// Add jQuery
function importJs(url) {
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js');
// maybe use this in future release
// importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.js');

// Check if jQuery is loaded
function jQueryWait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
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
	var ids = ["hp_1", "hp_3", "div .hp_50_r",
	           "banner", 
	           "#SKYSCRAPER", "td .sk", 
	           "#CONTENT_AD", "#MEGASIZE_BANNER"];
	for ( var m = 0; m < ids.length; m++) {
		var n = ids[m];
		var d = jQy(n).hide();

	}

}
