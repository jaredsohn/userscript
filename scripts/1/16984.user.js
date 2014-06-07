// Version 1.01
// Friday, December, 21, 2007.
// Myspace Ad Skipper
// Update: Mark187
// markl187ld<<remove>>@@gmail.com
// Original: Adam Knutson
// crrimson[AT]gmail[DOT]com
//
// ==UserScript==
// @name         Myspace Login Ad Skipper
// @description  Skips the full page ads on myspace.com.
// @include      http://*.myspace.com/*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('myspace\.com/index\.cfm\?fuseaction\=ad.\login') > -1 ) {
    // This is an ad window, lets skip it.
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {
	if( links[i].innerHTML.indexOf('Skip this Advertisement') > -1 ) {
	    // this is the link we're looking for.  move along.
	    window.location.href = links[i].href; // click it
	    break;
	}
    }
}
