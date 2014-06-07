// ==UserScript==
// @name		NoFacebookAds
// @namespace	        http://userscripts.org/scripts/show/13650
// @description	        Remove Facebook Flyer and other adverts
// @include		http://*facebook.com*
// @exclude
// @version		0.5.4
// ==/UserScript==

var allAds, thisAd;
var logging = true;
allAds = document.evaluate("//div[contains(@id, 'sponsor')] | //div[contains(@id, 'ads')] | //div[contains(@class, 'ads')] | //div[@id='announce'] | //div[contains(@class, 'social_ad')]  | //div[contains(@id, 'sidebar_ads')] | //div[contains(@class, 'profile_sidebar_ads')] | //div[contains(@class, 'adcolumn')] | //div[@class='adcolumn'] | //div[contains(@class, 'adcolumn_header')] | //div[contains(@class, 'bumper')] | //div[@class='adcolumn_header'] //div[contains(@id, 'adcolumn_advertise')] | //div[contains(@id, 'pagelet_adbox')]",
 				    document, 
				    null, 
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
				    null);
                    
for(var i=0; i < allAds.snapshotLength; i++ ){
	thisAd = allAds.snapshotItem(i);
	thisAd.style.display = "none";
	thisAd.parentNode.removeChild(thisAd);	
}



