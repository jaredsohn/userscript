// ==UserScript==
// @name	slashdot slashboxes remover
// @namespace	http://www.herenow.org.il/
// @author	Yoni
// @description	remove right-side panel (slashboxes and ads) from slashdot website, increases content area for reading but leaves the rest intact, as it is useful for registered users.
// @include	http://slashdot.org/*
// @include	http://*.slashdot.org/*
// ==/UserScript==

(function() {

	head = document.getElementsByTagName("head")[0];
	if (head) {
		// removing the right side
		right =  document.getElementById("slashboxes");
		if (right) {
			parent = right.parentNode;
			parent.removeChild (right);
		}
		// removing ads

		style = document.createElement("style");
		style.type  = "text/css";
		style.innerHTML =
		"#wrapper #articles { margin-right: 1em;}\n" +
		"#wrapper #indexhead { margin-right: 1em; padding-right: 0px;}\n" +
		".ad1, .ad6 { display: none;}\n" +
		"#art1, #art2, #slink1, #slink1 .comments, #slink2, #slink2 .comments { margin-right: 0px; }\n";
		head.appendChild (style);
	}
})();
