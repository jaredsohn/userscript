// ==UserScript==
// @name          Remove stupid digg ads
// @namespace     http://jeffpalm.com/diggads/
// @description   Removes the ads from digg in the middle of the posts
// @include       http://*digg.com/*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */
const TESTING = false;

function main() {
	var ds = document.getElementsByTagName("div");
	for (var i=0; i<ds.length; i++) {
		if (ds[i].className && ds[i].className.match(/sponsored/)) {
			ds[i].parentNode.removeChild(ds[i]);
			break;
		}
	}
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}