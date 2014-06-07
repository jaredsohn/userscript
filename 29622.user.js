// LaterLoop: External Links
// version 0.1 BETA!
// 2008-07-04
// Copyright (c) 2008, Rafael Robayna
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           LaterLoop: External Links
// @namespace      http://caimansys.com/greasemonkey/
// @description    Cause all saved links in laterloop.com to open in a new tab/window.
// @include        http://www.laterloop.com/*
// @include        http://laterloop.com/*
// @version        0.1
// ==/UserScript==

window.addEventListener("load", function() {

	var laterloop = document.evaluate('//div[@class="title"]/a[@rel="nofollow"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < laterloop.snapshotLength; i++) {
		laterloop.snapshotItem(i).setAttribute("target", "_blank");
	}
}, false);