// ==UserScript==
// @name			USA Today Remove Ads
// @author			Erik Vold
// @namespace		usaTodayRemoveAds
// @include			http*://*.usatoday.com*
// @include			http*://*.usatoday.net*
// @match			http*://*.usatoday.com*
// @match			http*://*.usatoday.net*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-03
// @lastupdated		2009-12-18
// @description		This userscript removes a large amount of known ads from usatoday.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

var usaTodayRemoveAds = {};
usaTodayRemoveAds.setup = function(){
	var adIDAry = [ 'leaderboard', 'footerAdMain', 'divMarketplace', 'Adv1', 'Adv2', 'Adv3', 'Adv4', 'Adv5', 'Adv6', 'Adv8', 'Adv8', 'Adv9', 'relatedLinksWide', 'bottomBannerBorder', 'adHeadline', 'footerSponsorMain', 'sponsoredLinks' ];
	var classNameAry = [ 'leaderboardContainer', 'moveAdOn', 'ad-poster' ];
	var clearParentClassNameAry = [ 'advertisementDisclaimer', 'adAgate' ];
	var tempEle = "";
	var tempEles = "";
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
	// remove children of parent nodes for known ad disclaimer class names
	for (var i = 0; i < clearParentClassNameAry.length; i++) {
		tempEles = document.getElementsByClassName(clearParentClassNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.innerHTML = '&nbsp;';
		}
	}
	// extras
	tempEles = document.getElementsByTagName( 'embed' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].src.match( /^http:\/\/i.usatoday.net\/_fronts\/_ear\/flash\.swf/i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
};
// just incase
window.addEventListener( "load", usaTodayRemoveAds.setup, false );
// because this seems to remove some lingering ads
window.addEventListener( "load", function(){setTimeout( usaTodayRemoveAds.setup, 1100 );}, false );
// usually does the job
usaTodayRemoveAds.setup();