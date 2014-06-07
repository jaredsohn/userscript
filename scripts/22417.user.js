// ==UserScript==
// @name         IMDB Ad Skipper
// @description  Skips the full-page ads on imdb.com.
// @include      http://*.imdb.com/*
// @include      http://imdb.com/*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('?dest=') > -1 ) {
    // This is an ad window, lets skip it.
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {
	if( links[i].innerHTML.indexOf('here') > -1 ) {
	    // this is the link we're looking for.  move along.
	    location.replace(links[i].href); // click it
	    break;
	}
    }
}
