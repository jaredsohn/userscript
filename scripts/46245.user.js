// ==UserScript==
// @name           Facebook - Fix Fingerpori comments
// @namespace      maeki.org
// @description    Lay out comments so the profile pictures don't overlap
// @include        http://apps.facebook.com/fingerpori/index.php?s=*
// ==/UserScript==

var allDivs, thisDiv; 
allDivs = document.evaluate( "//div[@class='wallkit_profilepic']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < allDivs.snapshotLength; i++) { 
  thisDiv = allDivs.snapshotItem(i); 
  thisDiv.parentNode.style.minHeight=String(thisDiv.childNodes[0].childNodes[0].height)+'px';
}