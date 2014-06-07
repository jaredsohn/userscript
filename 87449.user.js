// ==UserScript==
// @name           Crazy Heels - Popup
// @namespace      Woems
// @include        http://www.crazy-heels.de/shop/popup_image.php*
// ==/UserScript==

function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}


$x("//img").forEach(function (e) {
  e.addEventListener("click",function (e) {
    window.close();
  },true);
});
