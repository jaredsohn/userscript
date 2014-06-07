// ==UserScript==
// @name          I Don't Really Want To Share 
// @namespace     http://userscripts.org/angelans
// @description   Hides Share button 
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var header = document.getElementById('masthead');
var links = header.getElementsByTagName('a');
if (links != null && links.length > 0) {
    for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
        if (links[linkIndex].className.indexOf('addthis') > -1)
            links[linkIndex].style.display = "none";
    }
} 