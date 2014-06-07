// ==UserScript==
// @name           Skip Window Live Smartscreen
// @include        http://link.smartscreen.live.com/*
// @date           21/abr/2012
// ==/UserScript==

if ( navigator.userAgent.indexOf( 'Firefox' ) > -1 ) {
	unsafeWindow.submitContinue();
} else {
	window.submitContinue();
}