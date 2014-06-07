// ==UserScript==
// @name           Open Google Links in New Tab
// @namespace      http://www.techmonk.com
// @description    Opens the search result links in a new tab automatically
// @include        http://www.google.com/*
// @include        http://www.google.co.in/*
// @include        https://www.google.com/*
// @include        https://www.google.co.in/*
// @include        http://*.google.com/*
// @include        http://*.google.co.in/*
// ==/UserScript==


var x = document.getElementsByClassName("l"); 

for (i=0; i<=9; i++) {
x[i].setAttribute("target", "_blank");
}
