// ==UserScript==
// @match http://proquest.safaribooksonline.com/print?*
// @name SafariBooks Print Helper
// @description Removes the SafariBooks header when printing a book. Also downsizes images that are too large for the page.
// ==/UserScript==

// add a stylesheet

(function(){
	
	(function injectStyle() {
		// create a stylesheet element
		var style = document.createElement('style');
		
		// populate it with styles
		style.innerHTML = "img {max-width: 100%;} .docIndexterm {display: none;}";
		
		// append the style element to the document body
		document.body.appendChild(style);
	})();
	
	(function removeHeader() {
		// get the content div
		var theDiv = document.getElementById('loading').nextElementSibling;
		
		// go through it's child elements
		// remove all elements up to and including the second HR
		var child = theDiv.firstElementChild;
		var nextChild;
		var numHRs = 0;
		do {
			// get and store the next element
			nextChild = child.nextElementSibling;
			
			// check if it's an HR
			if (child.tagName == "HR") {
				numHRs++;
			}
			
			// remove the current element
			child.parentNode.removeChild(child);
			
			child = nextChild;
		}
		while (numHRs < 2);
		
	})();
	
})();