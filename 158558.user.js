// ==UserScript==
// @name          Douban Broadcast
// @namespace     http://userscripts.org/user/JupiterII
// @description   add a broadcast link on douban nav tab
// @include       http://*.douban.com/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='global-nav-items']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	// 使用 thisDiv
	var innerStr = thisDiv.innerHTML;
	var index = innerStr.indexOf("<ul>") + 4;
	innerStr = innerStr.replace("<ul>", "<ul><li><a href='http://www.douban.com/update/'>友邻广播</a></li>");
	thisDiv.innerHTML = innerStr;

}