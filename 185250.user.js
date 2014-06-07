// ==UserScript==
// @name        Phoronix External Link Finder
// @description Phoronix is great, but they try too hard to keep you on the site. This script highlights links to external pages in blue, so you can pull them out of articles easier.
// @namespace   http://userscripts.org/
// @include     http://www.phoronix.com/*
// @grant       none
// @version     1
// ==/UserScript==

var elements = document.body.getElementsByTagName('a');

for (var i = 0; i < elements.length; i++) {
    if(elements[i].href.indexOf("phoronix") == -1)
        elements[i].style.color = "blue";
}