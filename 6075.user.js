// Version +.1
// Friday, December, 16, 2005.
// Myspace Ad Skipper addon 1
// Zuriel
// 
//
// ==UserScript==
// @name         Myspace Ad Skipper addon
// @description  Skips the new full page adds on myspace. used in conjunction with the original ad skipper.
// @include      http://*.myspace.com/*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('myspace\.com/index\.cfm\?fuseaction\=interstitial') > -1 ) {
    // This is an ad window, lets skip it.
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {
	if( links[i].innerHTML.indexOf('Skip this') > -1 ) {
	    // this is the link we're looking for.  move along.
	    window.location.href = links[i].href; // click it
	    break;
	}
    }
}

