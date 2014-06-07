// ==UserScript==
// @name           W3Schools: use DuckDuckGo
// @namespace      Aspi
// @description    Replace W3Schools' use of Google with DuckDuckGo
// @include        http://*w3schools.com/*
// @require        http://usocheckup.redirectme.net/104352.js?method=update
// @version        0.3
// ==/UserScript==

// ==ChangeLog==
// @history        0.03 Created function to remove trailing "site:host"
// @history        0.02 Added updater
// @history        0.01 Initial release
// ==ChangeLog==

(function () {
	// Get search forms.
	var searchForms = document.getElementsByName('searchform')[0] ? document.getElementsByName('searchform') : document.forms,
		searchString;

	// Loop through, and modify, forms.
	for (var i = 0; i < searchForms.length; i += 1) {
		// If it is a form at all.
		if (searchForms[i].tagName && searchForms[i].tagName.toLowerCase() === 'form') {
			// Make it's action DuckDuckGo.
			searchForms[i].action = 'https://duckduckgo.com/';
			
			// Loop through elements to modify them.
			// Array to hold elements to remove.
			var elementsToRemove = [];
			
			for (var j = 0; j < searchForms[i].elements.length; j += 1) {
				var currentElement = searchForms[i].elements[j];
				
				// Remove the (hidden) "sitesearch" element.
				if (currentElement.name === 'sitesearch') {
					elementsToRemove.push(currentElement);
				}
				
				// Change name of search field from "as_q" to "q".
				if (currentElement.name === 'as_q') {
					currentElement.name = 'q';
					
					// Function to replace "searchquery site:w3schools.com" with "searchquery".
					currentElement.addEventListener('blur', function () {
						this.value = searchString;
					}, false);
				}
			}
			
			// Remove elements to remove after loop is done, to not clutter up the loop.
			for (var k = 0; k < elementsToRemove.length; k += 1) {
				elementsToRemove[k].parentNode.removeChild(elementsToRemove[k]);
			}
			
			// Add listener to add " site:w3schools.com" to search query.
			searchForms[i].addEventListener('submit', function () {
				for (var i = 0; i < this.elements.length; i += 1) {
					if (this.elements[i].name === 'q') {
						// Copy searchstring for later replacement.
						searchString = this.elements[i].value;
						
						// Add " site:w3schools.com" to search query.
						this.elements[i].value += ' site:' + window.location.host;
					}
				}
			}, false);
		}
	}
}());