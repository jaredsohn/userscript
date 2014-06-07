// ==UserScript==
// @name           Video link embedify
// @namespace      http://userscripts.org/users/23652
// @description    Turns video links into embed tags
// @include        *
// @exclude        about:*
// @exclude        chrome:*
// @copyright      JoeSimmons
// ==/UserScript==

// XPath multiple, but the array returned is a normal array[x]
// Always uses ordered node snapshot
// Syntax: $xM("//a", "//img", "//form");
function $xM() {
  var i, x, arr = [], xpr;
  for(x=0; x<arguments.length; x++) {
  xpr = document.evaluate(arguments[x],document,null,7,null);
  for (i=0; i<xpr.snapshotLength; i++) {arr.push(xpr.snapshotItem(i));}
  }
  return arr;
}

var videolinks = $xM("//a[contains(@href, '.wmv')]", "//a[contains(@href, '.mpg')]", "//a[contains(@href, '.flv')]", "//a[contains(@href, '.mp4')]", "//a[contains(@href, '.avi')]"), vll=videolinks.length;

var i, vl, em;

for(i=0; i<vll; i++) {
vl = videolinks[i];
em = document.createElement('embed');
em.src = vl.href;
em.width = 160;
em.height = 120;
vl.parentNode.replaceChild(em, vl);
}