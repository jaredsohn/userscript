// ==UserScript==
// @name        gunnutz
// @namespace   Deleter
// @include     http://www.canadiangunnutz.com/forum/*
// @version     1
// @grant		none
// ==/UserScript==

var x = 0;
var catchTable = document.evaluate( "/html/body/div/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
while((table = catchTable.snapshotItem(x) ) !=null){
table.parentNode.removeChild(catchTable.snapshotItem(x));
x++;
}
