// ==UserScript==
// @name           Alert download ready 
// @namespace      http://lunrfarsde.blogspot.com	
// @description    Alerts when the wait period is ended for a download
// @include        http://*rapidshare.de/files/*
// @include        http://*rapidshare.com/files/*
// ==/UserScript==

function checkReady() {
	if (unsafeWindow.c < 3) {
		alert('Ready to download');
	}
	else {
		setTimeout(checkReady, 2000);
	}
}

checkReady();