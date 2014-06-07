// NoFrontPictures
// version 1.0 2010-02-17
// Copyright © 2010 Septimus
// CC-BY-SA (http://creativecommons.org/licenses/by-sa/3.0/)
//
// ==UserScript==
// @name           NoFrontPictures
// @namespace      http://userscripts.org/users/87905
// @description    Replace pictures in the front page with something safe
// @include        http://fetlife.com/*
// @include        https://fetlife.com/*
// ==/UserScript==

document.addEventListener('DOMNodeInserted', doCats, false);

function doCats(e) {
	images = document.evaluate(
		"//span[contains(@class, 'mini_feed_picture')]/a/img",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < images.snapshotLength; i++) {
		img = images.snapshotItem(i);
		img.src="http://images3.fetlife.com/0/688/legos_20080226053307_60.jpg";
	}
}

doCats(0);