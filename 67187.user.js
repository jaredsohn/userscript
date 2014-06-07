// ==UserScript==
// @name      Using insertAfter in Greasemonkey
// @namespace  http://userscripts.org/users/110447
// @description    A working example of insertAfter function
// @version		   0.1
// @include        http://*userscripts*
// ==/UserScript==


//////////////////////////////////////////////////////
// This is a premade insertAfter function.          //
// It emulates what a insertAfter method would do   //
// if it existed.                                   //
// It is similar to insertBefore method.            //
// It will work in any script.                      //
//////////////////////////////////////////////////////

// Create our variables to use in the insertAfter function...

// newElement is the variable of new element/data you wish to insert.
// This is just an example using an empty table
var newElement = document.createElement("table");

	// lets add a height to the empty table to make a more dramatic effect.
	// This will just push all the content on the right side of the page way down.
	newElement.setAttribute("height", "400px");
	
// targetElement is the variable of element you wish to insert newElement after/below.
var targetElement = document.getElementById("content");



// Start the insertAfter function

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {

	// target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	// if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
	
		// add the newElement after the target element.
		parent.appendChild(newElement);
		
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

// End insertAfter function.

// Execute the insertAfter function.
insertAfter(newElement, targetElement);
// End Executing the insertAfter function.