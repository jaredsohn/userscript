// ==UserScript==
// @name           ImageFecalator
// @namespace      http://example.com
// @description    version 0.3 - Nuke images
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
// @include        *kingdomofloathing.com/game.php*
// @include        *127.0.0.1:600*/game.php*

// ==/UserScript==

//for(var i=document.images.length-1; i>=0; i--) {
//image = document.images[i];
//image.parentNode.removeChild(image);
//}



var imgs = document.getElementsByTagName('img');

for (i=0; i<imgs.length; i++)

{

  imgs[i].style.visibility = 'hidden';

}


