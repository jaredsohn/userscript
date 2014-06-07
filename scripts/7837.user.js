// ==UserScript==
// @name           Ellipses Bane
// @namespace      http://mywebsite.com/myscripts
// @description    Deletes ellipses, maybe?
// @include        http://www.gamerswithjobs.com/node/*
// ==/UserScript==

snapshotItems = document.evaluate("//div[@class='comment-content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < snapshotItems.snapshotLength; i++)
{
  snapshotItems.snapshotItem(i).innerHTML = snapshotItems.snapshotItem(i).innerHTML.replace( /\.{2,}/g , ".");
}