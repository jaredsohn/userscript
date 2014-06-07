// ==UserScript==
// @name           Youtube hide related video previews
// @namespace      youtube
// @include        http://www.youtube.com/*
// ==/UserScript==


(function () {
	var vids = unsafeWindow.document.querySelectorAll(".related-video img");
	for(var i = 0; i < vids[i]; i++) {
		vids[i].style.display = 'none';
	}
})();