// ==UserScript==
// @name        MapMyRun Don't Wait For Ads
// @namespace   http://www.dummdödel.de
// @description Removes the ads you have to wait for
// @include     http://www.mapmyrun.com*
// @include     http://new.mapmyrun.com*
// @version     1.1
// ==/UserScript==

if ((document.location.href.indexOf("http://www.mapmyrun.com/interstitial/?redirect_url=") == 0) || (document.location.href.indexOf("http://new.mapmyrun.com/interstitial/?redirect_url=") == 0)) {
	document.location.href = document.location.href.substr(0,23)+unescape(document.location.href.substr(51));
}