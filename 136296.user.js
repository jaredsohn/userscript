// ==UserScript==
// @name           Add Water wilting button
// @namespace      
// @include        http://www.memrise.com/home/
// @include        http://memrise.com/home/
// @include        http://www.memrise.com/beta/home/
// @include        http://memrise.com/beta/home/
// ==/UserScript==

// Credit due to http://stackoverflow.com/questions/8581949/greasemonkey-find-link-and-add-another-link for general GreaseMonkey script structure

var links = document.querySelectorAll("a.btn");
for (var J = links.length-1;  J >= 0; --J) {
	var thisLink            = links[J];

	if (thisLink.innerHTML == "<span>Water all</span>") {
		// Create a duplicate copy of the node
		// See https://developer.mozilla.org/en/DOM/Node.cloneNode
		var addedNode = thisLink.cloneNode(true);

		// Check if we've found the right node - ???

		// Update node - 
		// 1. regexp replace "plant_filter=garden" with "plant_filter=wilting"
		addedNode.href=addedNode.href.replace(/garden$/, "wilting");

		// 2. Alter "Water all" text inside the span tag to say "Water wilting"
		addedNode.innerHTML="<span>Water wilting</span>";

		thisLink.parentNode.insertBefore(addedNode,thisLink);

	}
}