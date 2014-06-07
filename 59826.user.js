// ==UserScript==
// @name           Remove Digg Ads
// @namespace      http://userscripts.org/users/112700
// @description    Script to remove sponsored "stories" from Digg homepage
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// @version        0.2
// ==/UserScript==

var sponsoredStories = document.getElementsByClassName("sponsored");
var adElements = document.getElementsByClassName("ad");
var adListElements = document.getElementsByClassName("ad-list");
for(var i = 0; i < sponsoredStories.length; i++) {
	sponsoredStories[i].style.display = "none";
}
for(var i = 0; i < adElements.length; i++) {
	adElements[i].style.display = "none";
}
for(var i = 0; i < adListElements.length; i++) {
	adListElements[i].style.display = "none";
}