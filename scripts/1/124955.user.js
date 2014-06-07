// ==UserScript==
// @name           Link fixer
// @namespace      web_surfer
// @include        http://forum.scanlover.com/*
// ==/UserScript==

var allLinks = document.links;
for (var i = 0; i < allLinks.length; i++) {
	allLinks[i].href = allLinks[i].href.replace(/^https?:\/\/66\.232\.100\.81\//, "http://forum.scanlover.com/");
	}