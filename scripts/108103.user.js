// ==UserScript==
// @name           MUA adblocker
// @namespace      mua
// @description    blocks that ugly ad between the pages and the posts on MUA
// @include        http://makeupalley.com/*
// @include        http://www.makeupalley.com/*
// ==/UserScript==

var stuff_to_remove = [
"//div[@class='resultstats']",
];


function $x(p, context) {
if (!context) context = document;
var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
return arr;
}

stuff_to_remove.forEach(
function(xpath) {
$x(xpath).forEach(
function(item) {
item.parentNode.removeChild(item);
}
);
}
);