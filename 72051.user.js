// ==UserScript==
// @name           Highlight Moderators
// @namespace      reddit.com
// @include        http://www.reddit.com/*
// ==/UserScript==

location.href = "javascript:(" + encodeURI(uneval(function() {

	// Get the first div.content element
	var elm = document.getElementsByClassName('content')[0];
		
		// Store the childNodes[N] in an array
		var mods = [];
		var length = elm.childNodes.length;
		
		// Directly copy the links into the array.
		for (var n = 0; n < length; n++) {
			mods[n] = elm.childNodes[n].href;
		}
		
	// Now grab all elements with .author.
	var authors = document.getElementsByClassName('author');
	var count = authors.length;
	
	for (n = 0; n < count; n++) {
			
		for (var i = 0; i < length; i++) {
		
			if (authors[n].href === mods[i]) {
			
				authors[n].style.color = '#009900';
				
			}
			
		}
		
	}

})) + ")();";