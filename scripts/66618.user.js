//Based on haldean's Mac Chromium Orangered Fix: http://userscripts.org/scripts/show/65213
//Released under the MIT License.  Go nuts.
// ==UserScript==
// @name          Snow Leopard Chrome PNG Fix
// @namespace     http://metacollin.com
// @description   Fixes the corrupt color profiles in The mail, oranged mail, help, and close icons on reedit.
// @include       http://*.reddit.com/*
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (i in images) {
	if (images[i].src.match(/mailgray\.png$/)) {
		images[i].src = "http://metacollin.com/reddit/mailgrayfixed.png";
	}
	else if (images[i].src.match(/mail.png$/)) {
		images[i].src = "http://metacollin.com/reddit/mailfixed.png";
	}
	else if (images[i].src.match(/help.png$/)) {
		images[i].src = "http://metacollin.com/reddit/helpfixed.png";
	}
	else if (images[i].src.match(/kill.png$/)) {
		images[i].src = "http://metacollin.com/reddit/killfixed.png";
	}
}