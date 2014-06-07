// ==UserScript==
// @name          Slashdot recolor
// @namespace     http://home.earthlink.net/~x1011/
// @include       http://it.slashdot.org/*
// @include       http://yro.slashdot.org/*
// @description   Recolors slashdot sections
// ==/UserScript==
//last updated: 2005-09-27

(function() {
	link = document.evaluate('//head/link[starts-with(@href, "//images.slashdot.org/slashdot_")]',
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
	link.parentNode.removeChild(link)
})();