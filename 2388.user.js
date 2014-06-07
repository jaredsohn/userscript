// ==UserScript==
// @name			eBay watch this item
// @src				http://52g.de/
// @description		script to add "watch this item" links on ended auctions (localizations: de)
// @include			http://cgi.ebay.*/*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var div = xpath("//DIV[contains(@id,'watchLinkTopDiv')]").snapshotItem(0);
if(!div)
{
	var locale_link = xpath("//TD[contains(@class,'logoimg')]").snapshotItem(0).firstChild.href;
	var locale = locale_link.substring(locale_link.indexOf(".ebay.") + 6, locale_link.length - 1);
	var id_link = xpath("//SPAN[contains(@id,'DetailsBidHistory')]").snapshotItem(0).firstChild.href;
	var id = id_link.substring(id_link.indexOf("item=") + 5);
	//GM_log(locale + ' ' + id);

	var obj = xpath("//TD[contains(@id,'watching')]").snapshotItem(0);
	if(obj)
	{
		var localString = new Array;
		if(locale == "de")
		{
			localString[0] = "Diesen Artikel";
			localString[1] = "in Mein eBay beobachten";
		}
		else
		{
			localString[0] = "Watch this item";
			localString[1] = "in My eBay";
		}
		obj.innerHTML = "<b><a href='http://cgi.ebay." + locale + "/ws/eBayISAPI.dll?MakeTrack&amp;item=" + id + "'>" + localString[0] + "</a></b> " + localString[1];
	}
}
