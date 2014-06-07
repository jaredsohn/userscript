// ==UserScript==
// @name			Yahoo Video Ads Remover
// @author			Erik Vold
// @namespace		yahooVideosRemoveAds
// @include			http://video.yahoo.com*
// @include			https://video.yahoo.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-05
// @lastupdated		2010-01-05
// @description		This userscript removes a large amount of known ads from video.yahoo.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

(function(){
	var adIDAry = ['other_ticker'],
		classNameAry = ['ad_slug_table'],
		tempEle = null,
		tempEles = null,
		i=adIDAry.length-1;
	// remove known ad ids
	for (; i > -1; i--) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	// remove known ad class names
	for (i=0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
})();