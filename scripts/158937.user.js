// ==UserScript==
// @name        Hide NZBclub downvoted
// @namespace   http://waddles.org/nzbclub
// @description Hide nzbs that have been downvoted on NZBclub.com
// @include     http://www.nzbclub.com/*
// @version     2
// @grant       none
// ==/UserScript==

// get all the rgMasterTable table body rows
var arTableRows = document.evaluate("//table[@class='rgMasterTable']/tbody/tr",
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var bNormalRow = true;
var iHidden = 0;
for (var i = 0; i < arTableRows.snapshotLength; i++) {
  var elmRow = arTableRows.snapshotItem(i);
  // true if row contains a negativevote span
  var bDownVoted = document.evaluate("descendant::span[@class='negativevote']",
    elmRow, null, XPathResult.BOOLEAN_TYPE, null);
  if (bDownVoted.booleanValue) {
    elmRow.style.display = "none"; // hide this row
    iHidden++;
  }
  else { // apply alternating table row styles
    elmRow.className = bNormalRow ? "rgRow" : "rgAltRow";
    bNormalRow = !bNormalRow;
  }
}
// report the number of hidden entries in the pager row
if (iHidden) {
  var arInfoParts = document.evaluate("//table[@class='rgMasterTable']//tr[@class='rgPager']//div[contains(@class,'rgInfoPart')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < arInfoParts.snapshotLength; i++) {
    var elmInfo = arInfoParts.snapshotItem(i);
    var newInfo = document.createElement("span");
    newInfo.innerHTML = "(" + iHidden + " hidden)";
    newInfo.className = "negativevote";
    elmInfo.appendChild(newInfo);
  }
}