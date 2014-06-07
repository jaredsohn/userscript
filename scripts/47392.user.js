// ==UserScript==
// @name          Blizzard Intercept Removal
// @namespace     http://userscripts.org/
// @description   Removes the warning page when clicking on an external link in Blizzard Entertainment's World of Warcraft forums
// @include       http://forums.wo(w-europe|rldofwarcraft).com/*
// ==/UserScript==

unsafeWindow.warn = function(url) {
	return true;
}