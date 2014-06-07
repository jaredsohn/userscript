// ==UserScript==
// @name        twitter hide machine translation
// @revision    1
// @author      KID the Euforia a.k.a. blueberrystream
// @description 機械翻訳されたものを隠します。
// @namespace   http://kid0725.usamimi.info
// @include     http*://twitter.com/*
// ==/UserScript==

void(function() {

var INTERVAL = 100, C = 'js-machine-translated-tweet-container';

function byClass(className, parent) {
	var e = parent ? parent : document;
	return e.getElementsByClassName(className);
}
function removeElement(element) {
	return element.parentNode.removeChild(element);
}

function HIDE() {
	var cs = byClass(C);
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			removeElement(cs[i]);
		}
	}

	setTimeout(HIDE, INTERVAL);
}

setTimeout(HIDE, INTERVAL);

})();