// ==UserScript==
// @name           letitbit
// @namespace      flukke
// @description    Redirect to code captcha page automatically (for free users)
// @include        http://letitbit.net/download/*
// ==/UserScript==

function xpath(query) { 
	return document.evaluate(
		query, 
		document, 
		null, 		
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null
	); 
}

var bot = xpath('//*[@type="submit"]');
var download = bot.snapshotItem(2);
download.click();
