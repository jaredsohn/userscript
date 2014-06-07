/* Efficient version of a good idea of slotos (http://slotos.livejournal.com/)
 * Author: Hampei
 */
// ==UserScript==
// @name           IPB signature image trasher
// @namespace      http://hampei.vanderveen.name
// @description    Removes images from signatures in IPB
// @include        *showtopic*
// ==/UserScript==

var imgs = document.evaluate("//div[@class='signature']//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0,img; img = imgs.snapshotItem(i); i++)
 img.parentNode.removeChild(img);