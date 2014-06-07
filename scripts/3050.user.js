// Desiest Ad Skipper
// Version 1.0
// January, 30, 2006
// Nimit Maru

//
// ==UserScript==
// @name         Desiest / Fastclick Ad Skipper
// @description  Script that skips the full page ads of Desiest (and fastclick in general).
// @include      http://*fastclick.net*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('media\.fastclick\.net') > -1 ) {
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {
	if( links[i].innerHTML.indexOf('Skip') > -1 ) {
	    window.location.href = links[i].href;
	    break;
	}
    }
}

