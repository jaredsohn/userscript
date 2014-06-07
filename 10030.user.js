// ==UserScript==
// @name           revertBook
// @namespace      http://www.facebook.com
// @description    Removes all user-installed applications on facebook profiles
// @include        http://*facebook.com*profile.php*
// ==/UserScript==

var appDivs = document.evaluate( '//div[contains(@id, "box_app")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i < appDivs.snapshotLength; i++) appDivs.snapshotItem(i).parentNode.removeChild(appDivs.snapshotItem(i));