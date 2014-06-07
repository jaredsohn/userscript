// ==UserScript==
// @name              Facebook - Replace Daily_motion app links
// @namespace         http://userscripts.org/users/VincentRemond
// @description       Replaces all Daily_motion application links directly to dailymotion.com.
// @include           *.facebook.com*
// ==/UserScript==

// Script widely inspired on this script : http://userscripts.org/scripts/show/58452

function ReplaceLinks() {
	var a = document.getElementsByTagName("a");
	for (i=0; i < a.length; i++) {
		a[i].href = a[i].href.replace(/^http:\/\/apps\.facebook\.com\/daily_motion\/video\//i, 'http://www.dailymotion.com/video/');
	}
}

function checkForUpdate() {
	document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
	setTimeout(ReplaceLinks, 0);
	document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();
