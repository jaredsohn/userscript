// ==UserScript==
// @name			New York Times Ads Remover
// @author			Erik Vold
// @namespace		nytAdsRemover
// @include			http://*.nytimes.com*
// @include			http://nytimes.com*
// @include			https://*.nytimes.com*
// @include			https://nytimes.com*
// @match			http://*.nytimes.com/*
// @match			http://nytimes.com/*
// @match			https://*.nytimes.com/*
// @match			https://nytimes.com/*
// @version			0.1.3
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-12-18
// @description		This userscript removes a large amount of known ads from nytimes.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

var nytAdsRemover = {};
nytAdsRemover.setup = function(){
	if(nytAdsRemover.chkForSkipAd()) return;
	var adIDAry = ['adxLeaderboard', 'adxSponLink', 'adxSponLinkA', 'adxSponLink2', 'SponLink', 'adxCircBottom', 'adxMiddle', 'adxMiddle5', 'adxBigAd', 'google_ads', 'google_ads_aCol', 'TopAd'];
	var classNameAry = ['advertisementColumnGroup', 'bigAd', 'singleAd', 'adCreative', 'centeredAd'];
	var tagNameAry = [ 'nytd_dynamic_ifads' ];
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
	tempEles = document.getElementsByTagName( 'iframe' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].src.match( /^http:\/\/ad\./i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
	tempEles = document.getElementsByTagName( 'a' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].href.match( /^http:\/\/www\.nytimes\.com\/adx/i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
};
nytAdsRemover.chkForSkipAd=function(){
	var skipImg=document.evaluate('//a/img[@name="skip" and contains(@src,"skip")]',document,null,9,null).singleNodeValue;
	if(skipImg){
		window.location=skipImg.parentNode.href;
		return true;
	}
	return false;
}
// just incase
window.addEventListener( "load", nytAdsRemover.setup, false );
// because this seems to remove some lingering ads
window.addEventListener( "load", function(){setTimeout( nytAdsRemover.setup, 1100 );}, false );
// usually does the job
nytAdsRemover.setup();