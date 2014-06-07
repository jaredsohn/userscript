// Version 1.0
// Friday, December, 16, 2005.
// Myspace Ad Skipper
// Adam Knutson
// crrimson[AT]gmail[DOT]com
//
// ==UserScript==
// @name         Myspace Ad Skipper
// @description  Skips the full page ads on myspace.com.
// @include      http://*.myspace.com/*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('myspace\.com/index\.cfm\?fuseaction\=ad') > -1 ) {
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
