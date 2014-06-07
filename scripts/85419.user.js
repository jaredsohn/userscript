// ==UserScript==
// @name           isoHunt: fix middleclick in chrome
// @namespace      http://mywebsite.com/lior
// @description    For chrome only. Fixes middle click on links, which opens them in current tab as well as in a new tab.
// @include        http://www.isohunt.com/*
// @include        http://isohunt.com/*
// ==/UserScript==

(function() {
var links = document.getElementsByTagName("tr");
for (i=0; i<links.length; i++) { links[i].onclick = function() { } }
})()