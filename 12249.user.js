//Created April 13, 2007 by tribble222
//Version 0.2 released June 20, 2008

// ==UserScript==
// @name	Remove ubuntuforums.org tooltips
// @version	0.2
// @description	Removes annoying ubuntuforums.org tooltips
// @include	http://*ubuntuforums.org/*
// ==/UserScript==


var allTDs, thisTD;
allTDs = document.evaluate(
    "//td[@class='alt1']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTDs.snapshotLength; i++) {
    thisTD = allTDs.snapshotItem(i).removeAttribute("title")

}