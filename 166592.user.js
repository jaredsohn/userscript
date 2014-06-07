// ==UserScript==
// @name        VCDQ Banner Ad Remover
// @namespace   PutterPlace
// @description Removes the annoying banner advertisements from VCDQ.
// @include     http://www.vcdq.com/*
// @include     http://vcdq.com/*
// @version     1.2
// ==/UserScript==

if ((document.location.href.indexOf('vcdq.com') > -1) && (window.self === window.top)) {
	var bannerAds = document.evaluate('//iframe[@class="ibas"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (bannerAds.snapshotLength > 0) {
		for  (var i=0; i<bannerAds.snapshotLength; i++) {
			if ((document.location.href.indexOf('/release/') > -1) && (i == 1)) {
				bannerAds.snapshotItem(i).parentNode.parentNode.removeChild(bannerAds.snapshotItem(i).parentNode);
			}
			else {
				bannerAds.snapshotItem(i).parentNode.parentNode.parentNode.removeChild(bannerAds.snapshotItem(i).parentNode.parentNode);
			}
		}
	}
}