// ==UserScript==
// @name           easy-share alert download ready 
// @namespace      	
// @description    Alerts when the wait period is ended for a download
// @include        http://*easy-share.com/*
// ==/UserScript==

// Based on lunrfarsde's script http://userscripts.org/scripts/review/4917
// Warning: unsafeWindow is not safe

function checkReady() {
	if (unsafeWindow.w < 3) {
		alert('Ready to download');
	}
	else {
		setTimeout(checkReady, 2000);
	}
}

checkReady();