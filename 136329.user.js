// ==UserScript==
// @name           hide ads <Facebook>
// @revision       3
// @author         KID a.k.a. blueberrystream
// @description    Facebookの右サイドバーにに出てくる広告を隠します
// @namespace      http://kid0725.usamimi.info
// @include        http*://www.facebook.com/*
// ==/UserScript==

void(function() {

hide();
function hide() {
	var pane = byId('pagelet_ego_pane'), as, i, adBlock;
	if (!pane) {
		pane = byId('pagelet_ego_pane_w');
		if (!pane) {
			return;
		}
	}
	as = byTag('a', pane);
	for (i = 0; i < as.length; i++) {
		if (-1 < as[i].href.indexOf('/ads/adboard/')) {
			adBlock = as[i].parentNode.parentNode.parentNode.parentNode;
		}
	}
	if (!adBlock) {
		for (i = 0; i < as.length; i++) {
			if (-1 < as[i].href.indexOf('/campaign/landing.php')) {
				adBlock = as[i].parentNode.parentNode.parentNode.parentNode.parentNode;
			}
		}
	}
	if (!!adBlock) {
		adBlock.style.display = 'none';
	}
	setTimeout(hide, 100);
}

function byId(id, parent) {
  var e = parent ? parent : document;
  return e.getElementById(id);
}
function byTag(tagName, parent) {
	if (!tagName) return null;
	var e = parent ? parent : document;
	return e.getElementsByTagName(tagName);
}

})();