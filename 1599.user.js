// ==UserScript==
// @name          Yahoo Groups Link Correction
// @namespace      http://members.cox.net/arcum_dagsson/greasemonkey/yahoolinkcorrection.user.js
// @description   Change the file links on Yahoo Groups not to redirect
// @include       http://groups.yahoo.com/*/files/*/
// ==/UserScript==

var allTitleLinks, thisLink, fileName;
var currentpage = window.location.href;

allTitleLinks = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTitleLinks.snapshotLength; i++) {
    thisLink = allTitleLinks.snapshotItem(i);
    
    fileName = thisLink.href.match("\/([^\/]*$)");
    if (thisLink.href.match("(\/*\.grp\.yahoofs\.com)")) {
    thisLink.href = currentpage + fileName[1];}
}

//*[@title]
