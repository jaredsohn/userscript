// ==UserScript==
// @name          Flatworld_Footer_Hider
// @description   Hide the persistent navigation filter in the Flatworld Knowledge text reader
// @include       http*://*.flatworldknowledge.com/*
// ==/UserScript==


hidediv("sticky-textbook-footer");

function hidediv(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}
