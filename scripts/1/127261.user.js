// ==UserScript==
// @name        twitter hide similar-to-you and who-to-follow
// @revision    2
// @author      KID the Euforia a.k.a. blueberrystream
// @description 詳細ページへのリンクだけを残してSimilar to youとWho to followを隠します。
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
}

function HIDEwtf4home() {
	var i, cs = byClass('component'), c, fmhs, fmh, fmis, fmi;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('data-component-term') == 'user_recommendations') {
				c = cs[i];
				break;
			}
		}
	}
	if (c) fmhs = byClass('flex-module-header', c), fmis = byClass('flex-module-inner', c);
	if (fmhs) fmh = fmhs[0];
	if (fmh && fmh.style.marginBottom != 'auto') fmh.style.marginBottom = 'auto';
	if (fmis) fmi = fmis[0];
	if (fmi && fmi.style.display != 'none') fmi.style.display = 'none';
}

function HIDEwtf4discover() {
	var i, cs = byClass('list-link'), c, cars, car;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('href') == '/#!/who_to_follow/suggestions') {
				c = cs[i];
				break;
			}
		}
	}
	if (c) cars = byClass('avatar-row', c);
	if (cars) car = cars[0];
	if (car && car.style.display != 'none') car.style.display = 'none';
}

function HIDE() {
	HIDEsty();
	HIDEwtf4home();
	HIDEwtf4discover();

	setTimeout(HIDE, INTERVAL);
}

setTimeout(HIDE, INTERVAL);

})();