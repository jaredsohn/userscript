// ==UserScript==
// @name           gh image
// @namespace      http://geizhals.at
// @include        http://geizhals.at/*
// ==/UserScript==

   
   var nodes = document.evaluate('//td[@class=\'ty\']/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );
   var nodes2 = document.evaluate('//p[@class=\'x\']/small', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   
   for (var x=0; x<result.length; x++)
   {
   var artnr =nodes.snapshotItem(x).href.substr(nodes.snapshotItem(x).href.length - 11, 6);
   nodes2.snapshotItem(x).innerHTML = nodes2.snapshotItem(x).innerHTML + '\<br><td align=center\>\<img src\=\"http://geizhals.at/img/pix/' + artnr + '.jpg width\=65 height\=65\>\<\/td\>';
   }