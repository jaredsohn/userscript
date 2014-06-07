// ==UserScript==
// @name           JHED Picture
// @namespace      http://www.jhu.edu/
// @description    Show pictures of people in JHED
// @include        http://jhed.jhu.edu/jhed/*
// @include        https://jhed.jhu.edu/jhed/*
// @include        http://jhed.jhmi.edu/jhed/*
// @include        https://jhed.jhmiedu/jhed/*
// @include        https://jhed.johnshopkins.edu/jhed/*
// @include        https://jhed.johnshopkins.edu/jhed/*
// ==/UserScript==

// Based heavily on http://userscripts.org/scripts/source/8712

// for soem reason, some people's JHED pages don't show pictures

var box_path = document.evaluate('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr[2]/td', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (box_path.snapshotLength > 0) {

   // First find the data
   var link_path = document.evaluate("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody/tr/td[3]/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if (link_path.snapshotLength > 0) {
      link = link_path.snapshotItem(0);
      var link_bits = link.href.split("&"); // you'll want the last two
      var box = box_path.snapshotItem(0);
      if (box.childNodes.length == 0) {
         var img = document.createElement("img");
         img.width = 190;
         img.height = 243;
         img.border = 1;
         img.src="http://jhed.jhu.edu/jhed/cfc/photo_proxy.cfm?" + link_bits[link_bits.length - 1] + "&" + link_bits[link_bits.length - 2];
         box.appendChild(img);
      }
   }
}
