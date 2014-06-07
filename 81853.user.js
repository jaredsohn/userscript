// ==UserScript==
// @name           ImageReplacer
// @namespace      http://example.com
// @description    Nuke images
// @include        *kingdomofloathing.com/desc_item.php*
// @include        *127.0.0.1:600*/desc_item.php*
// @include        *kingdomofloathing.com/desc_familiar.php*
// @include        *127.0.0.1:600*/desc_familiar.php*
// @include        *kingdomofloathing.com/desc_effect.php*
// @include        *127.0.0.1:600*/desc_effect.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *127.0.0.1:600*/inventory.php*
// @include        *kingdomofloathing.com/hermit.php*
// @include        *127.0.0.1:600*/hermit.php*
// @include        *kingdomofloathing.com/store.php*
// @include        *127.0.0.1:600*/store.php*
// @include        *kingdomofloathing.com/mallstore.php*
// @include        *127.0.0.1:600*/mallstore.php*
// @include        *kingdomofloathing.com/searchmall.php*
// @include        *127.0.0.1:600*/searchmall.php*
// @include        *kingdomofloathing.com/galaktik.php*
// @include        *127.0.0.1:600*/galaktik.php*
// @include        *kingdomofloathing.com/mrstore.php*
// @include        *127.0.0.1:600*/mrstore.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *127.0.0.1:600*/fight.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *127.0.0.1:600*/charpane.php*
// @include        *kingdomofloathing.com/familiar.php*
// @include        *127.0.0.1:600*/familiar.php*
// @include        *kingdomofloathing.com/adventure.php*
// @include        *127.0.0.1:600*/adventure.php*
// @include        *kingdomofloathing.com/dungeon.php*
// @include        *127.0.0.1:600*/dungeon.php*
// @include        *kingdomofloathing.com/campground.php*
// @include        *127.0.0.1:600*/campground.php*
// @include        *kingdomofloathing.com/shore.php*
// @include        *127.0.0.1:600*/shore.php*
// @include        *kingdomofloathing.com/council.php*
// @include        *127.0.0.1:600*/council.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *127.0.0.1:600*/main.php*
// @include        *kingdomofloathing.com/sewer.php*
// @include        *127.0.0.1:600*/sewer.php*
// @include        *kingdomofloathing.com/charsheet.php*
// @include        *127.0.0.1:600*/charsheet.php*
// @include        *kingdomofloathing.com/showplayer.php*
// @include        *127.0.0.1:600*/showplayer.php*
// @include        *kingdomofloathing.com/displaycollection.php*
// @include        *127.0.0.1:600*/displaycollection.php*
// @include        *kingdomofloathing.com/rats.php*
// @include        *127.0.0.1:600*/rats.php*
// @include        *kingdomofloathing.com/restaurant.php*
// @include        *127.0.0.1:600*/restaurant.php*

// ==/UserScript==


var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://images.kingdomofloathing.com/');
	if (srcMatch != null) {
  thisImg.src = 'http://127.0.0.1/nopic.gif';
	}
}
