// ==UserScript==
// @name           ColiPRESETS
// @namespace      http://userscripts.org/
// @description    Add a post preset to The Coli!
// @author         numbs
// @include        http://www.thecoli.com/threads/*
// @version        1.0
// ==/UserScript==

'use strict';

var allItems = document.evaluate('.//textarea', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allItems.snapshotLength; i++) {
	allItems.snapshotItem(i).innerHTML = '[color=#0AA1FF]';
} 