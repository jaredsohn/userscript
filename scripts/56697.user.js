// ==UserScript==
// @name			Remove Ad Banners from PBS
// @author			Erik Vold
// @namespace		pbsRemoveAdBannerContainers
// @include			http://*.pbs.org*
// @include			http://pbs.org*
// @include			https://*.pbs.org*
// @include			https://pbs.org*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-08-30
// @description		This userscript removes ad banners from pbs.org
// ==/UserScript==

var pbsRemoveAdBannerContainers = {};
pbsRemoveAdBannerContainers.setup = function(){
	var adIDAry = [];
	var classNameAry = ['adbanner-container'];
	var tagNameAry = [];
	var tempEle = "";
	var tempEles = "";
	// remove known ad ids
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) {
			tempEle.parentNode.removeChild(tempEle);
		}
	}
	// remove known ad class names
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
	// remove known ad tag names
	for (var i = 0; i < tagNameAry.length; i++) {
		tempEles = document.getElementsByTagName(tagNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
};
pbsRemoveAdBannerContainers.setup();
