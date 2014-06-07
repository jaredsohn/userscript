// ==UserScript==
// @name           iGoogle top bar remover v2
// @namespace      google.com
// @description    Removes the white bar at the top of your iGoogle page
// @version 2      Update for new 01/2008 page layout
// @include        http://www.google.*/ig
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='gbh']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}

var footer = document.getElementById('footerwrap');
if (footer) {
    footer.parentNode.removeChild(footer);
}

document.getElementById("gbar").style.display = "none";

document.getElementById("guser").parentNode.style.display = "none";

document.getElementById("gbi").style.display = "none";