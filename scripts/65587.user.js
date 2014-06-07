// ==UserScript==
// @name			Digg Ads Remover
// @author			Erik Vold
// @namespace		diggAdsRemover
// @include			http*://*.digg.com*
// @include			http*://digg.com*
// @match			http*://*.digg.com*
// @match			http*://digg.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-02
// @lastupdated		2010-01-02
// @description		This userscript removes a large amount of known ads from digg.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

(function(){
	var adIDAry = ['advertisement','ad','sponsor-banner','div#topads','topads','block_ad_msft'],
		classNameAry = ['advertisement','ad','sponsored','ad-list','promo'],
		tempEle = null,
		tempEles = null;

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