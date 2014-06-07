// ==UserScript==
// @name		  AnonyMouse.Org Remove Banner
// @description   Removes that annoying banner ad that follows you on every page
// @include	  http://anonymouse.org/*
// @exclude	   
// @version       0.1
// ==/UserScript==

// Create removeElement function
// Will remove any element with an attribute
function removeElement(el, attribs, attribValue) {
	// Get element tag
	var div = document.getElementsByTagName(el);
	var myAttribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			// Get attribute
			myAttribs = div[i].getAttribute(attribs);
			// Get attribute value
			if(myAttribs == attribValue){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	};
// End removeElement function

removeElement('div', 'id', 'mouselayer');