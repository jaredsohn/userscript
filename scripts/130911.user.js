// Link Fix
// version 0.1
// 2012-04-14
// Copyright (c) 2012, Jacoii
// --------------------------------------------------------------------
// ==UserScript==
// @name           Link Fix
// @namespace      http://userscripts.org/users/jacoii
// @description    替换国际教育视频库的链接，配合IE TAB即可在FIREFOX中观看视频。
// @include        http://192.168.5.30:88/poster.aspx?RESOURCE_ID=*
// ==/UserScript==
var allLinks, thisLink, oldlink, id, templink, newlink;
templink = "http://192.168.5.30:88/play_page.aspx?PRIMARVIDEO_ID=*&KJBFQ=1&BLTBFQ=1&IE=6";
allLinks = document.evaluate("//a[contains(@href,'openplay')]",	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	oldlink = thisLink.getAttribute('href');
	id = oldlink.match(/\d+/gi);
	newlink = templink;
	newlink = newlink.replace('*',id);
	//alert(newlink);
	thisLink.setAttribute('href',newlink);
}