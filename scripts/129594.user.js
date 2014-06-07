// ==UserScript==
// @name           Words With Friends Cleaner
// @namespace      wnayes
// @description    Removes distracting content from the popular Facebook game.
// @include        https://wwf-fb.zyngawithfriends.com/*
// ==/UserScript==

// Array of XPaths to remove
var xpaths = new Array(
    // ZBAR
    "//div[@class='zbar_holder']",
    "//div[@id='zap-bac-container']",
    "//div[@id='suggestions']",
    "//div[@id='fb_like']"
);

// Perform the removal
xpaths.forEach(
    function(a) {
        $x(a).forEach(function(b) { b.parentNode.removeChild(b) });
    }
);

// Hide "Game Over" sidebar section
GM_addStyle("div.game_over { visibility: hidden; height: 1px; }"); 

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}