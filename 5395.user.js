
// ==UserScript==
// @name          Google 2 Wikipedia
// @namespace     http://www.huemay.com/
// @description   Redirects from Google search to Wikipedia article.
// @include       http://google.com/*
// @include       http://www.google.com/*
// ==/UserScript==

(function () {
	function keyHandler (event) {
		if (event.ctrlKey && event.shiftKey && event.keyCode == 191) {
			var query = /q=([^&]*)/.exec(window.location.search);
			if(query) {
				query[1] = query[1].replace(/\+/g,"_");
				window.location.href = "http://en.wikipedia.org/wiki/"+query[1];
			}
		}
	}
	
	window.document.addEventListener('keydown', keyHandler, false);
}) ();
