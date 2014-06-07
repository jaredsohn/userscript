// ==UserScript==
// @name           Varsity Screenmarking
// @description    Attempts to load in images under each link
// @author         Ed Ireson
// @include        http://varsitybookmarking.com/*
// @version        0.1
// ==/UserScript==

// Need to figure out a good way to pull screenshots and store on my server, so that we can get away from screenshot services.

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//ul[@class='answer']/li/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var getURL = thisDiv.getAttribute("href");
    thisDiv.innerHTML = thisDiv.innerHTML + "<br /><img src='http://edpad.com/screen-master/img.php?url=" + getURL + "' style='width:100%;'/>";

}
