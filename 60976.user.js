// ==UserScript==
// @name			Mixx Ads Remover
// @author			Erik Vold
// @namespace		mixxRemoveAds
// @include			http://*.mixx.com*
// @match			http://*.mixx.com*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-31
// @lastupdated		2009-12-18
// @description		This userscript removes a large amount of known ads from mixx.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

(function(){
	var classNameAry = ['google_ads','ads'];
	var tempEle = "";
	var tempEles = "";
	// remove known ad class names
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
	tempEles = document.getElementsByTagName( 'script' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].src.match( /^ad\.yieldmanager\.com/i ) ) {
			tempEle=tempEles[i].parentNode;
			if(tempEle.className.match(/static/i)) tempEle.parentNode.removeChild(tempEle);
			else tempEle.removeChild(tempEles[i]);
		}
	}
})();