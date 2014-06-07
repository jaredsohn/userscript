// ==UserScript==
// @name           flukke's letitbit free user v0.9
// @namespace      letitbit auto click on free user (for the new platform)
// @description    auto click on free button, for the moment this script don't autoclick on the "download button", but if its download // rate is hight, i would finish... 
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

var free = xpath('//*[@name="frameset"]').snapshotItem(0);
if(free) free.click();