// ==UserScript==
// @name        Longitudes and Fartitudes
// @namespace   http://jn1.me
// @description Injects The Onion's fartscroll.js into New York Times articles written by Thomas Friedman
// @include     http://www.nytimes.com/*
// @version     1.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none

// ==/UserScript==

var author = $('h6.byline > span > a > span').text();

console.log(author);
if (author == "THOMAS L. FRIEDMAN") {
    console.log("MORE LIKE THOMAS L. FARTMAN");
    (function () {    
        var fs = document.createElement('script');
    	fs.setAttribute('src', 'http://code.onion.com/fartscroll.js');
    	document.head.appendChild(fs);
    	window.setTimeout(function(){
    		fartscroll(800);
    	}, 500);
    }());
}