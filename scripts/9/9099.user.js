// ==UserScript==
// @name          Remove exclamation marks from digg article titles
// @version		  0.1
// @namespace     http://userscripts.org/scripts/show/9099
// @description   Removes exclamation marks from digg article titles
// @include       http://digg.com/*
// @include       http://*.digg.com/*  
// ==/UserScript==

var getHthrees = document.getElementsByTagName('h3');
for (var index = 0; index < getHthrees.length; index++) {
var replac = getHthrees[index].childNodes[0].textContent.replace(/!/gi, "");
getHthrees[index].childNodes[0].textContent = replac;
}