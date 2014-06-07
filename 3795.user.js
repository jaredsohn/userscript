// ==UserScript==
// @name           ExpandHeise
// @description    Removes right column on Heise.de
// @include        http://www.heise.de/
// @include        http://www.heise.de/newsticker/*
// ==/UserScript==

var mustPerish = document.evaluate("//td[@class='rand_oben2']|//td[@class='rund']|//td[@class='wallpaper']|//table[@class='rand_rechts']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);
                 
var damned;

if (mustPerish) {
  for (var i = 0; i < mustPerish.snapshotLength; i++) {
    damned = mustPerish.snapshotItem(i);
    damned.parentNode.removeChild(damned);
  }
} 