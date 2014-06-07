// ==UserScript==
// @name           Show Hidden Element
// @description	   Simple script to show hidden element
// @include        *
// ==/UserScript==

var allDiv, thisDiv;
allDiv = document.evaluate('//div', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allDiv.snapshotLength; i++)
{
  thisDiv = allDiv.snapshotItem(i);
  if (thisDiv.style.display == "none") 
    thisDiv.style.display = "block";
}