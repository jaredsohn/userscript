// ==UserScript==
// @name         Fatwallet Redirect
// @version      1.4
// @namespace	 none
// @description	 Fixup fatwallet redirects.
// @include	 http://www.fatwallet.com/*
// ==/UserScript==

var patternBounce = new RegExp("http:\/\/bounce.fatwallet.com\/.+url=(.+)");
var adminBounce = new RegExp("http:\/\/www.fatwallet.com\/.+url=(.+)");
var origRemove = new RegExp("(.+)\&orig(.+)");

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var match = patternBounce.exec(links[i].href);
    if (match == null) {match = adminBounce.exec(links[i].href);}
    if (match != null) { 
        // alert(decodeURIComponent(match[1]));
        var newRef = origRemove.exec(decodeURIComponent(match[1]));
        // alert(newRef);
        if (newRef)
        	link.href = decodeURIComponent(newRef[1]);    
        else
            link.href = decodeURIComponent(match[1]);
    } 
}

/* 
// Original version of the code

// const pattern = new RegExp("http:\/\/bounce.fatwallet.com\/.+url=(.+)");
var links = document.getElementsByTagName("a");

var link;

for (i = 0; i < links.length; i++) {
    link = links[i];
    var match = pattern.exec(links[i].href);
    if (match != null) { link.href = match[1]; }
}
*/
