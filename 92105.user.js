// ==UserScript==
// @namespace		http://www.wolfiesden.com/greasemonkey/
// @name			IGN Ad Page Skip
// @description		Automatically bypass ad pages on IGN
// @include			http://*.ign.com/*
// ==/UserScript==

if(unsafeWindow.goBackToReferer)
	unsafeWindow.goBackToReferer();
