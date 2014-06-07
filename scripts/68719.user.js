// ==UserScript==
// @name           Imagefap search result filter
// @version        0.1
// @namespace      http://userscripts.org/users/132132
// @include        http://*.imagefap.com/search/*
// @include        http://*.imagefap.com/pics/*
// @include        http://*.imagefap.com/gallery.php*
// @description    Removes search results selecting by number of images and quality.
// ==/UserScript==

var sizesToRemove = new Array();

/*============================================
                    Options
============================================*/
//The minimum number of images you want in each gallery.
var numOfImgs = 60;

//The qualities that would be removed. Comment each line with "//" for preserve quality, uncomment for remove.  
sizesToRemove.push("Low Quality"); /*Low Quality = Small*/
sizesToRemove.push("Medium Quality"); /*Medium Quality = Medium*/
//sizesToRemove.push("High Quality"); /*High Quality = Large*/
//sizesToRemove.push("High Definition"); /*High Definition = Huge*/

/*============================================*/


gallrowsexp = "/html/body/center/table[2]/tbody/tr/td/table/tbody/tr/td/div/center/table/tbody/tr/td[2]/form/table/tbody/tr/td/table[2]/tbody/tr/td/center/table/tbody/tr";

//remove galleries by number of images
var gallrows = document.evaluate(gallrowsexp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var r = 2 ; r < (gallrows.snapshotLength - 1 ); r += 2 )
   {
   if(parseInt(gallrows.snapshotItem(r).getElementsByTagName("center")[0].innerHTML.match(/\d+/)) < numOfImgs)
      {
      gallrows.snapshotItem(r).parentNode.removeChild(gallrows.snapshotItem(r));
      gallrows.snapshotItem(r+1).parentNode.removeChild(gallrows.snapshotItem(r+1));
   }
}


//remove galleries by images quality
var gallrows = document.evaluate(gallrowsexp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var s = 0; s < sizesToRemove.length; s++)
   {
   for (var r = 2 ; r < (gallrows.snapshotLength - 1 ); r += 2 )
      {
      if(gallrows.snapshotItem(r).getElementsByTagName("td")[2].getElementsByTagName("img")[0].alt == sizesToRemove[s])
         {
         gallrows.snapshotItem(r).parentNode.removeChild(gallrows.snapshotItem(r));
         gallrows.snapshotItem(r+1).parentNode.removeChild(gallrows.snapshotItem(r+1));
      }
   }
}

