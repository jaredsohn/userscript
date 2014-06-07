// ==UserScript==
// @name           Pixxtra.com link forwarding
// @namespace      Pixxtra.com
// @description    Automatically clicks the 'Continue to your image...' link
// @include        http://pixxtra.com/image/*
// ==/UserScript==

var href = document.evaluate('//h3/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute('href');

if(href)
	window.location.href = href;
