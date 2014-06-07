// ==UserScript==
// @name			Technorati Ads Remover
// @author			Erik Vold
// @namespace		technoratiAdBlocker
// @include			http*://*.technorati.com*
// @include			http*://technorati.com*
// @match			http*://*.technorati.com*
// @match			http*://technorati.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-02
// @lastupdated		2010-01-02
// @description		This userscript removes a large amount of known ads from technorati.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

var technoratiAdBlocker = function(){
	var adIDAry = ['digg-widget-container','insitu','sponsor-banner'],
		classNameAry = ['advertisement','js-poweredBy'],
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
};
// just incase
//window.addEventListener( "load", nytAdsRemover.setup, false );
// because this seems to remove some lingering ads
//window.addEventListener( "load", function(){setTimeout( nytAdsRemover.setup, 1100 );}, false );
// usually does the job
technoratiAdBlocker();