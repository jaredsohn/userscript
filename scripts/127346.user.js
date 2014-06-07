// ==UserScript==
// @name        twitter cancel italic bio
// @revision    1
// @author      KID the Euforia a.k.a. blueberrystream
// @description bioが斜体になっているのを解除します。
// @namespace   http://kid0725.usamimi.info
// @include     http*://twitter.com/*
// ==/UserScript==

void(function() {

var INTERVAL = 100, C = 'bio';

function byClass(className, parent) {
	var e = parent ? parent : document;
	return e.getElementsByClassName(className);
}

function NORMALIZE() {
	var cs = byClass(C);
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			cs[i].style.fontStyle = 'normal';
		}
	}

	setTimeout(NORMALIZE, INTERVAL);
}

setTimeout(NORMALIZE, INTERVAL);

})();