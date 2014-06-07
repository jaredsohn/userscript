// ==UserScript==
// @name          Izklop Frame Remover
// @description   Odstrani frame pri linku iz izklopa.
// @version       1.1
// @include       http://www.izklop.com/link_enc.php?* 
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    "//iframe",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

 for (var i = 0; i < allLinks.snapshotLength; i++) {
    div = allLinks.snapshotItem(i);
location.href=div.src
}

function isolate(str1,start2,end2)
{
var isotmp2 = str1
var isotmp = isotmp2.indexOf(start2)
isotmp2 = isotmp2.substring(isotmp + start2.length)
isotmp = isotmp2.indexOf(end2)
return isotmp2.substring(0, isotmp) 
}