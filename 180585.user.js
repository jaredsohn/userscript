// ==UserScript==
// @name                Google Direct Links
// @namespace           .
// @description         Script that changes annoying new-style Google links to direct links
// @include             http://google.tld/search?*
// @include             http://www.google.tld/search?*
// @include             https://google.tld/search?*
// @include             https://www.google.tld/search?*
// @include             https://google.tld/imgres?*
// @include             https://www.google.tld/imgres?*
// ==/UserScript==

var allElements, thisElement;
allElements = document.evaluate('//*[@onmousedown]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allElements.snapshotLength; i++) {
 thisElement = allElements.snapshotItem(i);
 if(thisElement.nodeName.toUpperCase() == 'A'){
  thisElement.removeAttribute('onmousedown');
 }
}