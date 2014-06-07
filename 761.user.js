// ==UserScript==
// @name          GameTab: frame remove
// @include       http://gametab.com/news/*
// @include       http://www.gametab.com/news/*
// @description   Removes the GameTab frame from news links
// ==/UserScript==

(function() {
	var frames = document.evaluate("//FRAME[@name='main']/@src", document, null, XPathResult.ANY_TYPE, null);
	var realUri = frames.iterateNext().textContent;
	window.location.replace(realUri);
})();