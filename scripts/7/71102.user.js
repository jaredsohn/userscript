// ==UserScript==
// @name           Remove Image Alt text
// @description    Remove Image's Alt text
// @include        http://www.rune-server.org/forums.php
// ==/UserScript==

/* Removes the alt text of images(useful when disabling images)


images = document.evaluate('/a/img[@src="4rryhg.jpg"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
for (i = 0; i < images.snapshotLength; i++) {
  (foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
}