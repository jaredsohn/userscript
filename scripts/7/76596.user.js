// ==UserScript==
// @name          3dl.am direct linker
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Replaces the link input boxes with real links
// @include       http://*3dl.am/*/out.html
// ==/UserScript==

// Cache all input boxes to delete them after processing
var inputBoxesToDelete = [];

// Get all input boxes
var inputBoxes = document.getElementsByTagName('input');

// Iterate all boxes
for (i in inputBoxes)
{
	if (
		// Check whether the current element is a text box
		inputBoxes[i].type == 'text' &&
		
		// Check whether the current element contains a link
		inputBoxes[i].value.substring(0, 7) == 'http://'
	)
	{
		// Get the parent
		var parent = inputBoxes[i].parentNode;
		
		// Create the link
		var link = document.createElement("a");
		link.href = inputBoxes[i].value;
		link.innerHTML = inputBoxes[i].value;
 	
		// Add the link
		parent.appendChild(link);
		
		// Mark the input box for deletion
		inputBoxesToDelete.push(inputBoxes[i]);
	}
}

// Delete all replaced input boxes
for (i in inputBoxesToDelete)
{
	// Get the parent
	var parent = inputBoxesToDelete[i].parentNode;
	
	// Remove the input box
	parent.removeChild(inputBoxesToDelete[i]);
}