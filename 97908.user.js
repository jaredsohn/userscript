// ==UserScript==
// @name          moodle-DownThemAll
// @namespace     Bastian Meier
// @description   Change the Links so that they are downloadable with DownThemAll
// @include       *moodle.uni-kassel*
// ==/UserScript==

var href=document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; i < href.snapshotLength; i++) {
tmp = href.snapshotItem(i);

tmp.href = tmp.href.replace('view.php?id=', 'view.php?inpopup=true&id='); 
} 