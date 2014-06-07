// ==UserScript==
// @name          smilevilla : disable ads
// @namespace     http://userstyles.org
// @description	  Use this to disable ads from http://www.smilevilla.com/
// @author        ahha00001
// @version       1.0.5
// @license       MIT License
// @include       http://www.smilevilla.com/*
// ==/UserScript==
(function() {
	var target = document.evaluate('html/body/table[2]/tbody/tr[2]/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);
})();
