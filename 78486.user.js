// ==UserScript==
// @name           Ebay Junk Remover
// @namespace      #aVg
// @description    Remove auctions with zero bids on eBay. (http://www.ehow.com/how_4823661_of-ebay-again-filtering-junk.html)
// @include        http://*ebay.com/*
// @version        0.1
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var bids=document.evaluate("//td[contains(@class, 'bids') and contains(.,'0 Bids')]/../../..",document,null,6,null), bid, i=0;
while(bid=bids.snapshotItem(i++))
bid.parentNode.removeChild(bid);