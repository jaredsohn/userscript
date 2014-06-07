
// ==UserScript==
// @name          Wikipedia 2 Google    
// @namespace     http://www.huemay.com/
// @description   Redirects from Wikipedia article to Google search.
// @include       http://en.wikipedia.org/wiki/*
// ==/UserScript==

(function () {
	function keyHandler (event) {
		if (event.ctrlKey && event.shiftKey && event.keyCode == 191) {
			var article = window.location.href.slice("http://en.wikipedia.org/wiki/".length);
			article = article.replace(/_/g,"+");
			window.location.href = "http://www.google.com/search?q="+article;
		}
	}
	
	window.document.addEventListener('keydown', keyHandler, false);
}) ();
