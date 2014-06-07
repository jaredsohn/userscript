// ==UserScript==
// @name           MilliyetStopReloadPage
// @namespace      MilliyetStopReloadPage
// @description    Milliyet Sayfasinin Yenilenmemesi
// @include        http://www.milliyet.com.tr/*
// ==/UserScript==
	var oldFunction = unsafeWindow.refresh;
	unsafeWindow.refresh = function() {
	   return;
	};
