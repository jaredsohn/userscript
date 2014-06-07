// ==UserScript==
// @name			Ajaxian Remove Ads
// @author			Erik Vold
// @namespace		ajaxianRemoveAds
// @include			http://*.ajaxian.com*
// @include			http://ajaxian.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-13
// @lastupdated		2010-01-13
// @description		Removes known advertisement elements from Ajaxian webpages. If it misses any then let me know.
// ==/UserScript==

(function(){
	var adIDAry = ['ad-topright','taeheader','rightSideDartAd','googleAd'],
		tagNameAry = ['left_side_ad','right_sponsor_ad','ajaxian_experience_ad'],
		tempEle = null,
		tempEles = null,
		i = 0;

	// remove known ad ids
	for (; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	// remove known ad tag names
	for (i = tagNameAry.length-1; i >= 0; i--) {
		// DNW..
		//tempEles = document.getElementsByTagName(tagNameAry[i]);
		tempEles = document.evaluate("//*[@name='"+tagNameAry[i]+"']",document,null,7,null);
		for (var j = 0; j < tempEles.snapshotLength; j++) {
			tempEle=tempEles.snapshotItem(j);
			tempEle.parentNode.removeChild(tempEle);
		}
	}
	tempEle = document.evaluate("//div[@class='section']/h3[contains(text(),'Ajaxian Jobs')]",document,null,9,null).singleNodeValue;
	if(tempEle) tempEle.parentNode.parentNode.removeChild(tempEle.parentNode);
})();