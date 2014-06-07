// ==UserScript==
// @name           Remove All Facebook Ads
// @author         http://dmnic.me
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/13787
// @description    Removes any and all ads from Facebook.
// @include        *facebook.com*
// ==/UserScript==

function Remove_All_Facebook_Ads() {

	var newcode = '<'+'iframe id="domsad" name="domsad" src="http://rya.rockyou.com/ams/ad.php?placeguid=35A4145159&type=MediumRectangle" style="border:0px;" width="300" height="250" scrolling="no" frameborder="0"><\/iframe>';
	var count = 1;
	var pagelet_ads = document.getElementById('pagelet_ads');
	var sidebar_ads = document.getElementById('sidebar_ads');

	if (sidebar_ads && sidebar_ads.style.visibility!='hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		count = 0;
		sidebar_ads.style.visibility = 'hidden';
		pagelet_ads.innerHTML = sidebar_ads.innerHTML = newcode;
		pagelet_ads.style.width='350';
        pagelet_ads.style.height='260px';
        pagelet_ads.style.background='#fff';

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