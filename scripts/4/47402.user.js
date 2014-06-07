// ==UserScript==
// @name			sphinnDisplayTweaks
// @author			Erik Vold (erikvvold@gmail.com)
// @datecreated		April 23rd 2009
// @namespace		sphinnDisplayTweaks
// @include			http://sphinn.com/*
// @version			1.0
// @description		Removes ads.
// ==/UserScript==


var sphinnDisplayTweaks = {};

sphinnDisplayTweaks.cleanAds = function(){
	// remove side bar ad
	var googleSideBarAd = document.getElementById("google_ads_div_Sphinn_Sidebar_Cube");
	googleSideBarAd.parentNode.removeChild(googleSideBarAd);

	// remove top bar ad
	var googleSideBarAd = document.getElementById("google_ads_div_Sphinn_Leaderboard");
	googleSideBarAd.parentNode.removeChild(googleSideBarAd);
}

sphinnDisplayTweaks.setup = function(){
	// remove ads
	sphinnDisplayTweaks.cleanAds();
}

sphinnDisplayTweaks.setup();
