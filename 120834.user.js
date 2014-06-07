// ElectroFox Designs (Max Smiley)
// http://www.efoxdesigns.com/max
// GPL
// Works in both Firefox and Google Chrome

// ==UserScript==
// @name           Ad-less Grooveshark
// @version        1.3
// @namespace      http://grooveshark.com
// @description    Removes the ads from Grooveshark.com
// @include        http://*grooveshark.com/*
// ==/UserScript==

// -- CONFIG -- //

//set this to true if you don't want to see the background ad that fills up the Grooveshark home page.
var hide_main_splash = false;

// -- END CONFIG -- //

//we'll hide the ads...
var hidestyle = document.createElement('style');
hidestyle.setAttribute('type','text/css');
hidestyle.innerHTML = "div[class*='capital'] { width: 0px !important; display: none !important; } "
if (hide_main_splash)
	hidestyle.innerHTML = hidestyle.innerHTML + "#page_wrapper { background: #555; } #theme_home { display: none; }";
document.head.appendChild(hidestyle);

//and also attempt to remove the ad elements to they don't waste resources
function removeIt() {
	var ad_divs = document.evaluate("//div[contains(@class,'capital')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
	for(var i = 0; i < ad_divs.snapshotLength; i++) {
		var currentAd = ad_divs.snapshotItem(i);
		currentAd.parentNode.removeChild(currentAd);
	}
	try {
		var theme_home = document.getElementById('theme_home');
		if (theme_home.style.display == "none")
			theme_home.parentNode.removeChild(theme_home);
	} catch (e) { }
}

window.setTimeout(removeIt, 10000); //10-second wait to make sure the ad elements are on the page when we go to remove them.
