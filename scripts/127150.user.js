// ==UserScript==
// @name           Digikey quickfilter
// @description    Helps you quickly remove unwanted entries from the filtering options when searching for parts.
// @include        http://search.digikey.com/*
// ==/UserScript==

(function() {
var elements;	// Items being searched for
var current;	// The matching element currently being worked on
var re;			// Regular expression for search()
var x,i;		// Generic counters
var filter_box; // New text-input field

elements = document.evaluate("//select[@size]", // Grab all select boxes with a size attribute (which just happens to be the search boxes, how lucky is that?)
							document,
							null,
							XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							null);

for(i = 0; i < elements.snapshotLength; i++) { // Loop through all matching elements
	current = elements.snapshotItem(i); // easier to read reference to the current element being worked on
	name = current.name; // name attribute of the current element
	current.setAttribute("id", name); // used to set an id for the new filter boxes we will insert

	filter_box = document.createElement("input"); // Create a new text input field to put our filter text into
	filter_box.setAttribute("type", "text"); // it's a text box, for text, yay
	filter_box.setAttribute("id", "filter"+name); // assign an id to the text box derived from the name of the current selectbox

	filter_box.addEventListener('keyup', function (e){ // Let's add a listener that waits for us to put in a character in the box
				re = new RegExp(e.target.value, "i"); // convert the text we have typed in to a regular expression
				the_id = e.target.getAttribute("id").replace("filter", ""); // Really silly workaround to get the script to operate on the correct <select>. Using the "current" variable produces... interesting results.

				for(x = 0; x < document.getElementById(the_id).options.length; x++){ // Loop through all the options of the current select box
					if(document.getElementById(the_id).options[x].innerHTML.search(re) !== -1){ // does the current option match our filter?
						document.getElementById(the_id).options[x].setAttribute("style", "display:;"); // It does! Let's make sure it's visible
					}else{
						document.getElementById(the_id).options[x].setAttribute("style", "display:none;"); // It doesn't! Boo! Let's hide it.
					}
				}
			}, false);
	
	current.parentNode.appendChild(filter_box); // Append our newly created filter text inputter box after the select box
}

})();