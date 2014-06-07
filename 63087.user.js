// ==UserScript==
// @name			Google Groups Ads Remover
// @author			Erik Vold
// @namespace		ggroupsAdsRemover
// @include			http*://groups.google.com/*
// @match			http*://groups.google.com/*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-29
// @lastupdated		2010-04-27
// @description		Removes Ads from Google Groups.
// ==/UserScript==

(function($){
	var tempEle = $('google_ads_site');
	if(tempEle) tempEle.parentNode.removeChild(tempEle);

	tempEle = $('google_ads_frame');
	if(tempEle) tempEle.parentNode.removeChild(tempEle);
})(document.getElementById);
