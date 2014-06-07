//
// ==UserScript==
// @name           Imageless Link
// @namespace      http://sid.homelinux.com/blog
// @description    Add a link after every img tag. Usefull for browsing with "Load images automatically" option disabled.
// @include        *
// ==/UserScript==

// variables
var allElements, thisElement, newElement, afterElement, imgDescr;

// execute script after page load
window.addEventListener(
	'load',
	// anonymous function
	function() {
		
		// get all img tags 
		allElements = document.getElementsByTagName('img');
		
		for (var i = 0; i < allElements.length; i++) {
			
			// current img tag
			thisElement = allElements[i];
			
			// create link (a href) for the image
			newElement = document.createElement('a');
			newElement.target = '_blank'; // open in new window/tab
			newElement.href = thisElement.src;
			
			// if img has alt defined
			if(thisElement.alt)
				imgDescr = thisElement.alt;
			// if img has title defined
			else if(thisElement.title)
				imgDescr = thisElement.title;
			// if img has id defined
			else if(thisElement.id)
				imgDescr = thisElement.id;
			// it got nothing, bad, really bad
			else
				imgDescr = '?';
			
			if(thisElement.width)
				imgDescr += ';w:'+thisElement.width;
			
			if(thisElement.height)
				imgDescr += ';h:'+thisElement.height;
			
			// set the link label
			newElement.innerHTML = '[img:'+imgDescr+']'
			
			// if the img tag is inside a link tag
			if(thisElement.parentNode.tagName == 'A')
				// create the link outside that link tag
				afterElement = thisElement.parentNode;
			else
				afterElement = thisElement;
			
			// insert link after image
			afterElement.parentNode.insertBefore(newElement, afterElement.nextSibling);
			
		}
	},
	true
);
