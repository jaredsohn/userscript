// ==UserScript==
// @name           Freshbooks Enhancements
// @version        1.0.2
// @namespace      http://userscripts.org/scripts/show/63150
// @description    Automatically opens the search fields and expands the "all pages" links for you when viewing different pages
// @include        https://*.freshbooks.com/menu.php*
// ==/UserScript==

window.addEventListener(
	'load', 
	function() {
		// Search for the "All (int) Pages" link (in case it hasn't been opened already)
		var allPageLinks, thisPageLink;
		allPageLinks = document.getElementsByTagName('a');
		for (var i = 0; i < allPageLinks.length; i++) {
			thisPageLink = allPageLinks[i];
			// Find the "All (int) Pages" link using fast find method
			if (thisPageLink.innerHTML.match(/all \d* pages/)) {
				// Successful match
				window.location.href=thisPageLink;
				break;
			}
		}
		// Display the search field
		if(unsafeWindow.DisplaySearch){
			unsafeWindow.DisplaySearch();
		}
	},
true);