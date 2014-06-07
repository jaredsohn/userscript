// ==UserScript==
// @name           Remove Inline Google Ads
// @namespace      remove_inline_google_ads
// @description    Removes Google Ads that are seamlessly integrated in body text.
// @include        http://*
// ==/UserScript==

(function() {

	// Remove Inline Google Ads
	var ad = document.evaluate(
		"//div[@class='adcode']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; ad && i < ad.snapshotLength; i++)
	{
		var remove_me = ad.snapshotItem(i);
		remove_me.parentNode.removeChild(remove_me);
	}

	// Remove more Inline Google Ads
	var ad = document.evaluate(
		"//div[@class='googleads']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; ad && i < ad.snapshotLength; i++)
	{
		var remove_me = ad.snapshotItem(i);
		remove_me.parentNode.removeChild(remove_me);
	}

	// Remove Google Table Ads
	var ad = document.evaluate(
		"//table[@class='adsense']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; ad && i < ad.snapshotLength; i++)
	{
		var remove_me = ad.snapshotItem(i);
		remove_me.parentNode.removeChild(remove_me);
	}


})();
