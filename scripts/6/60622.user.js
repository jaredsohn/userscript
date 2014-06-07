// ==UserScript==
// @name			Last.fm Ads Remover
// @author			Erik Vold
// @namespace		lastFMRemoveAds
// @include			http://*.last.fm*
// @include			http://last.fm*
// @include			https://*.last.fm*
// @include			https://last.fm*
// @match			http://*.last.fm*
// @match			http://last.fm*
// @match			https://*.last.fm*
// @match			https://last.fm*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-26
// @lastupdated		2009-12-18
// @description		This userscript removes a large amount of known ads from last.fm. It doesn't get them all, but it removes quite a few.
// ==/UserScript==

(function(){
	var adIDAry = ['LastAd_Top','LastAd_Mid','LastAd_Bot','LastAd_Bottom','footer_ads','LastAd_TopRight','LastAd_BottomRight'];
	var classNameAry = ['LastAd'];
	var tempEle = "";
	var tempEles = "";
	// remove known ad ids
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	// remove known ad class names
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
})();