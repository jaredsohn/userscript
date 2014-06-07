// ==UserScript==
// @name           Spring Searchbar Killer
// @namespace      http://www.developer-b.com/
// @description    Removes the annoying Spring searchbar that messes up in-page search in Firefox
// @include        http://*grails.org/doc/*
// ==/UserScript==


/* Keeps polling the dom until the searchbar element has been created.
 * A better solution would be to prevent the searchbar script from
 * loading / executing in the first place, but I couldn't get that working. 
 */
(function() {

	var maxTimeout = 7000;
	var timeSpent = 0;
	var timeout = 500;
	
	var removed = false;
	
	var removeSearchBar = function() {
		if (!removed && timeSpent < maxTimeout) {
			window.setTimeout(removeSearchBarElement, timeout);
			timeSpent += timeout;
		}
	}
	
	var removeSearchBarElement = function() {
		var element = document.getElementById("searchBar");
		if (element) {
			element.parentNode.removeChild(element);
			removed = true;
		} else {
			removeSearchBar();
		}
	}
	
	removeSearchBar();
})();