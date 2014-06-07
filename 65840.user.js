// ==UserScript==
// @name			BOINCstats Ads Remover
// @author			Erik Vold
// @namespace		boincstatsAdRemover
// @include			http://boincstats.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-06
// @lastupdated		2010-01-06
// @description		This userscript removes a large amount of known ads from boincstats.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

(function(){
	var adIDAry = ['ads','google_ads_frame1','google_ads_frame2','google_ads_frame3','GoogleAdBottom','bottomleft','paypal'],
		tempEle = "",tempEles = "";
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	tempEle=document.evaluate("//iframe[@name='google_ads_frame']",document,null,9,null).singleNodeValue;
	if(tempEle) tempEle.parentNode.removeChild(tempEle);
})();