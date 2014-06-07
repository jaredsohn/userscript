// ==UserScript==
// @name TVProfil.net JS Slideshow Remover
// @version 1.0
// @namespace http://tvprofil.net/
// @description Removes JS Slideshow
// @author Ivan
// ==/UserScript==

(function () {

	function removePromoPics() {
		var child = document.getElementById("promo");
		var parent = child.parentNode;
		
		parent.removeChild(child);
	}

	removePromoPics();

})(document);