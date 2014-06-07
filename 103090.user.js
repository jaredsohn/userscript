// ==UserScript==
// @name           Bee Aware
// @namespace      http://letspretendthisisaurlforihasaclub.com
// @description    Greasemonkey script to highlight the letter b in inventory items
// @include        *kingdomofloathing.com/inventory.php*
// @include        *127.0.0.1:600*/inventory.php*
// @include        *kingdomofloathing.com/storage.php*
// @include        *127.0.0.1:600*/storage.php*
// ==/UserScript==


var replacementBee = "<font color='#FF0000'>b</font>";


var allItems, thisItem;
allItems = document.evaluate('//b[@class="ircm"]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);


for (var l = 0; l < allItems.snapshotLength; l++){

	thisItem = allItems.snapshotItem(l);

	thisItem.innerHTML = thisItem.innerHTML.replace(/b/g,replacementBee.toLowerCase() );
	thisItem.innerHTML = thisItem.innerHTML.replace(/B/g,replacementBee.toUpperCase() );
	
}
