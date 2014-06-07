// ==UserScript==
// @name           ShowPassword
// @namespace      http://www.raymondchen.com/userscript
// @description    Display your hidden password
// @include        http://*/*
// @include        https://*/*
// ==/UserScript==
var allElements, thisElement;
allElements = document.evaluate("//input[@type='password']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allElements.snapshotLength; i++) {
thisElement= allElements.snapshotItem(i);
thisElement.type='text';
}

