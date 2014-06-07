// ==UserScript==
// @name Hide ads on binsearch.info
// @description Hides the ads on binsearch.info
// @include http://www.binsearch.info/*
// @include http://binsearch.info/*
// ==/UserScript==

var iframes = document.getElementsByTagName("iframe");
while (var cx = 0; cx < iframes.length)
	iframes[0].parentNode.removeChild(iframes[0]);
	
undefined;