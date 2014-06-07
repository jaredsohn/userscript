// ==UserScript==
// @name           HUJI Popup Switcher
// @namespace      HUJI
// @version        1.1
// @description    Disable opening links in new windows in HUJI sites, and opens them in new tab instead
// @include        http://*.huji.ac.il/*
// @include        https://*.huji.ac.il/*
// ==/UserScript==

function openLink(url)
{
	// Opens in the same window
	document.location.href = url;
}

function openLinkIframe(url)
{
	// Opens in a new tab what is about to be opened from iframe
	window.open(url);
}

// The following are functions that the site builder created that opens popup windows.
// Forcing the browser to use the "fixed" functions
unsafeWindow.solution = openLink;
unsafeWindow.newWin = openLink;
unsafeWindow.win = openLink;
unsafeWindow.openWin = openLink;
unsafeWindow.openWinA = openLinkIframe;
unsafeWindow.openWinB = openLinkIframe;
unsafeWindow.openWinC = openLinkIframe;
unsafeWindow.openWinD = openLinkIframe;
unsafeWindow.openWinE = openLinkIframe;
unsafeWindow.open_mes = openLink;