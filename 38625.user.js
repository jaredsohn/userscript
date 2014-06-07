// License: 
// Do whatever you want with this code.
// ------------------------------------
// ==UserScript==
// @name          Fix dead links to ubuntuforums.com in Google results
// @description   Replaces links to ubuntuforums.com with correct links to ubuntuforums.org.
// @include       http://google.com/search*
// @include       http://www.google.com/search*
// ==/UserScript==

var links, a;
links = document.evaluate(
    "//a[contains(@href, 'ubuntuforums.com')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
	a.href=a.href.replace(/http:\/\/.+\.ubuntuforums\.com/,"http://ubuntuforums.org");
}
