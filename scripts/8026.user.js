// Google Ads Remover+

// history:
// 1.3          improved google domain 'ads by google' table removal, all old code replaced
// 1.2		bug fixes for old code, removed inline div ads from searches
//		optimised and replaced most old code, disabled 'toolbar/desktop' code (unneeded?)
// 1.1 		new code for google search
// 1.0 		base code fork

// ==UserScript==
// @name          Google Ads Remover+
// @description   removes ads from google searches, personal pages and custom search engines as well as offsite google ads.
// @version       1.3
// @include       http://*
// ==/UserScript==

(function() {

	// google domain only removal
	if(window.location.href.match( /http:\/\/www.google./) == 'http:\/\/www.google.')
	{
		// remove custom search engine based ads in tables
		var ad = document.evaluate("//a[contains(@href,'&adurl=http') or contains(@href,'/pagead/iclk') or contains(@href,'http://services.google.com')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; ad && i < ad.snapshotLength; i++)
		{
			var daddy = ad.snapshotItem(i);
			daddy.parentNode.removeChild(daddy);
		}
		// remove inline div based ads
		var ad = document.evaluate("//a[contains(@href,'&adurl=http') or contains(@href,'&q=http') or contains(@href,'/pagead/iclk')]/parent::div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; ad && i < ad.snapshotLength; i++)
		{
			var daddy = ad.snapshotItem(i);
			daddy.parentNode.removeChild(daddy);
		}
	}

	// get rid of iframe based ads
	var ad = document.evaluate("//iframe[contains(@name,'google_ads_frame')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < ad.snapshotLength; i++)
	{
		var daddy = ad.snapshotItem(i);
		daddy.parentNode.removeChild(daddy);
	}
})();
