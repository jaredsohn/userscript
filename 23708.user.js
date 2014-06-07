// ==UserScript==
// @name           Busfreunde
// @namespace      blubb
// @description    remove rows containing span class 'PhorumListSubjPrefix'. Entfernt die Stickies.
// @include        http://www.busfreunde.de/list.php*
// ==/UserScript==

var ads = document.evaluate("//span[@class='PhorumListSubjPrefix']/ancestor::tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for( var i = 0; i < ads.snapshotLength; i++ )
  if( ads.snapshotItem(i) && ads.snapshotItem(i) != 'undefined' ) // looking at the site, this shouldn't happen - but...belts and braces
    ads.snapshotItem(i).parentNode.removeChild(ads.snapshotItem(i));