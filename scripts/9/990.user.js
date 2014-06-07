// ==UserScript==
// @name Penny Arcade strip page ad remover
// @description Removes the top-ish banner ad from strip pages, only.
// @namespace http://www.miranda.org/~jkominek/
// @include http://*penny-arcade.com/comic*
// ==/UserScript==
// Banner ads near the top of the page require scrolling to access the
// content. This makes me sad.

var ads =
   document.evaluate("//div[contains(@id,'adhoriz')]",
                     document, null,
                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                     null);
if(ads.snapshotLength>0) {
  var ad = ads.snapshotItem(0);
  ad.parentNode.removeChild(ad);
}