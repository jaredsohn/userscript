// ==UserScript==
// @name           CNN Money Portfolio Ad Remover
// @author         Martin Ruiz
// @namespace      mr.ruiz@gmail.com
// @include        http://bcportfolio.money.cnn.com/*
// ==/UserScript==

function destroyAds(){
	var ads = new Array('adBannerTable','tradecenterAd');
	var ad;
	var div;
	for (ad in ads) {
		div = document.getElementById(ad);
		if (div) {
			div.parentNode.removeChild(div);
		}
	}
} // function destroyAds

destroyAds();
/*
(function () {
  window.setInterval(destroyAds, 500);
}());
*/