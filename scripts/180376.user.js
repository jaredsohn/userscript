// ==UserScript==
// @name        Github Issue title + GFM Link
// @namespace   http://wilcoxd.com/
// @description Provides a Github Flavored Markdown text as an issues title
// @include     https://github.com/*/issues/*
// @version     2
// @grant       none
// ==/UserScript==


(function() {

	function onDOMSubtreeModifiedHandler(e){
		var header = $("h1.gh-header-title span.gh-header-number")

		if (header.html().match("GFM:") == null) {
			var gfmReference =  window.location.pathname.replace(/\/issues\//, "#").substr(1)
			header.html( header.html() + " (GFM: " + gfmReference + ")")
		}

	};

	document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
})();
