// ==UserScript==
// @name           Digg.com Disable Direct Links
// @namespace      http://www.sernerdalot.com
// @description Changes digg links to always open comment page instead of going direct to the site
// @version     1.0.2
// @date        2008-7-29
// @creator     mikec20
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==

/** Find articles and reference elements **/
var titlePath  = "//div[@class='news-body']/h3/a[@href][1]";
var refElementPath = "//a[@class='tool comments' or @class='tool comments friend']";
var titles = document.evaluate(titlePath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var refElements = document.evaluate(refElementPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


if (titles.snapshotLength > 1) {
	for(var i = 0; i < titles.snapshotLength; i++)	{
		titles.snapshotItem(i).href=refElements.snapshotItem(i).href;
	}
}
