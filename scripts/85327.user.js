// ==UserScript==
// @name           Block Kevskoolers
// @version        v1.0
// @namespace      http://userscripts.org/users/215724
// @description    Tired of Kevskoolers? Block the looser.
// @author         Daijizai
// @include        http://deals.woot.com/deals/details/*
// ==/UserScript==
var thisAuthor, divContent, divFooter, nickname, i, description;
divContent = document.evaluate("//div[starts-with(@class, 'hcomment')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
divFooter = document.evaluate("//div[@class='footer']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; i < divFooter.snapshotLength; i++)
{
	if (divFooter.snapshotItem(i).innerHTML.indexOf('kevskoolkars') != -1)
	{
		divContent.snapshotItem(i).innerHTML = '';
	}
}