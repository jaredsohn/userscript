// ==UserScript==
// @name           KanyeToThe Font Preset - Red
// @namespace      http://userscripts.org/
// @description    Add a post preset!
// @author         numbrz
// @include        http://www.kanyetothe.com/forum/index.php?topic=*
// @version        1.1
// ==/UserScript==

'use strict';

var allItems = document.evaluate('.//textarea', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allItems.snapshotLength; i++) {
	allItems.snapshotItem(i).innerHTML = '[color=red]';
} 