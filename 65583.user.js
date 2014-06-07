// ==UserScript==
// @name			Vimeo Ads Remover
// @author			Erik Vold
// @namespace		technoratiAdBlocker
// @include			http*://*.vimeo.com*
// @include			http*://vimeo.com*
// @match			http*://*.vimeo.com*
// @match			http*://vimeo.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-02
// @lastupdated		2010-01-02
// @description		This userscript removes a large amount of known ads from vimeo.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

(function(){
	var adIDAry = ['ad','advertisement'],
		classNameAry = ['ad','advertisement'],
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
	tempEles = document.evaluate("//div[contains(@class,'nippleBox')]/div/h4[contains(text(),'Advertisement') or contains(text(),'Get Vimeo Plus!')]",document,null,7,null);
	for (var i = 0; i < tempEles.snapshotLength; i++) {
		tempEle=tempEles.snapshotItem(i).parentNode.parentNode;
		tempEle.parentNode.removeChild(tempEle);
	}
})();