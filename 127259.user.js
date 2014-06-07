// ==UserScript==
// @name        twitter hide similar-to-you
// @revision    2
// @author      KID the Euforia a.k.a. blueberrystream
// @description 詳細ページへのリンクだけを残してSimilar to youを隠します。
// @namespace   http://kid0725.usamimi.info
// @include     http*://twitter.com/*
// ==/UserScript==

void(function() {

var INTERVAL = 100;

function byClass(className, parent) {
	var e = parent ? parent : document;
	return e.getElementsByClassName(className);
}

function HIDEsty() {
	var i, cs = byClass('component'), c, fms, fm;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('data-component-term') == 'similar_user_recommendations') {
				c = cs[i];
				break;
			}
		}
	}
	if (c) fms = byClass('flex-module', c);
	if (fms) fm = fms[0];
	if (fm && fm.style.display != 'none') fm.style.display = 'none';

	setTimeout(HIDEsty, INTERVAL);
}

setTimeout(HIDEsty, INTERVAL);

})();