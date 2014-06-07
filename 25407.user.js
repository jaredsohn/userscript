//Written by FissionXuiptz
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nexus War, Full HP and MP Remover
// @namespace     http://userscripts.org/scripts/show/25407
// @description   Hides full HP and MP circles.
// @include       http://*nexuswar.com/map*
// ==/UserScript==

function removeImage(img) {
   var ilist, oneimage;
   ilist = document.evaluate("//img[@src='" + img + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < ilist.snapshotLength; i++) {
     oneimage = ilist.snapshotItem(i);
     oneimage.parentNode.removeChild(oneimage);
   }
}
removeImage('/images/map/character/state-hp-0.gif');
removeImage('/images/map/character/state-mp-0.gif');