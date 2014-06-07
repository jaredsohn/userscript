// ==UserScript==
// @name           remove baidu/lightnovel tieba pics resize func
// @namespace      tiebapic
// @include        http://tieba.baidu.com/*
// @include        http://www.lightnovel.cn/*
// @include        http://cnc.lightnovel.cn/*
// ==/UserScript==
allElements = document.evaluate(
	'//img[@onload] | //img[@class="BDE_Image"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	thisElement.removeAttribute("onload");
	thisElement.removeAttribute("width");
	thisElement.removeAttribute("height");
	thisElement.removeAttribute("style");
}