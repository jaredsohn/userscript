// ==UserScript==
// @name           CS to Wikipedia
// @namespace      CSW
// @description    Changes all links from CS Monitor tags to Wikipedia articles.
// @include        http://*.csmonitor.com/*
// ==/UserScript==


// change this: http://www.csmonitor.com/tags/topic/Charlie+Sheen
//     to this: https://en.wikipedia.org/wiki/Charlie_Sheen

var links = document.getElementsByTagName("a"); //array
var regex = /^http:\/\/www\.csmonitor\.com\/tags\/topic\/(.+)$/i;
var regex2 = /\+/g;
for (var i=0,imax=links.length; i<imax; i++) {
   links[i].href = links[i].href.replace(regex,"https://en.wikipedia.org/wiki/$1").replace(regex2, "_");
}