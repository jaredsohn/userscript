// ==UserScript==
// @name          image.ohozaa.com : disable ads
// @namespace     http://userstyles.org
// @description   Use this to disable ads from http://image.ohozaa.com/
// @author        ahha00001
// @version       1.0.0
// @license       MIT License
// @include       http://image.ohozaa.com/*
// ==/UserScript==

(function() {
	var target = document.evaluate('//*[@id="floating"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);
})();
