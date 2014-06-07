//
// Hides charms of which you already have 5 from shops, auction, guild showcase
//
// Thanks and credits go to WL for the solution!
//
// ==UserScript==
// @name	  Estiah - Hide charms
// @description	  Hides charms of which you already have 5 from shops, auction, guild showcase 
// @include       http://www.estiah.com/shop/*
// @include       http://www.estiah.com/market/craft/shop/*
// @include       http://www.estiah.com/market/auction*
// @include       http://www.estiah.com/guild/showcase
// ==/UserScript==

var temp = document.evaluate('//div[substring-before(@class, " ")="card_lr" and div[substring-before(@class, " ")="count"]=5]/../..', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < temp.snapshotLength; i++)
{
	temp.snapshotItem(i).parentNode.removeChild(temp.snapshotItem(i));
}
