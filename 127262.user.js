// ==UserScript==
// @name        twitter hide similar-to-you and who-to-follow completely
// @revision    1
// @author      KID the Euforia a.k.a. blueberrystream
// @description Similar to youとWho to followを詳細ページへのリンクごと隠します。
// @namespace   http://kid0725.usamimi.info
// @include     http*://twitter.com/*
// ==/UserScript==

void(function() {

var INTERVAL = 100;

function byClass(className, parent) {
	var e = parent ? parent : document;
	return e.getElementsByClassName(className);
}

function HIDEstyC() {
	var cs = byClass('component'), c;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('data-component-term') == 'similar_user_recommendations') {
				c = cs[i];
				break;
			}
		}
	}
	if (c && c.style.display != 'none') c.style.display = 'none';
}

function HIDEwtfC4home() {
	var i, cs = byClass('component'), c;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('data-component-term') == 'user_recommendations') {
				c = cs[i];
				break;
			}
		}
	}
	if (c && c.style.display != 'none') c.style.display = 'none';
}

function HIDEwtfC4discover() {
	var i, cs = byClass('list-link'), c;
	if (cs) {
		for (i = 0; i < cs.length; i++) {
			if (cs[i].getAttribute('href') == '/#!/who_to_follow/suggestions') {
				c = cs[i];
				break;
			}
		}
	}
	if (c && c.style.display != 'none') c.style.display = 'none';
}

function HIDE() {
	HIDEstyC();
	HIDEwtfC4home();
	HIDEwtfC4discover();

	setTimeout(HIDE, INTERVAL);
}

setTimeout(HIDE, INTERVAL);

})();