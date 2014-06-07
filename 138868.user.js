// ==UserScript==
// @name           Modify MemRise buttons
// @namespace      
// @include        http://www.memrise.com/home/
// ==/UserScript==

var links = document.querySelectorAll("a.btn");
for (var J = 0;  J <= links.length-1; J++) {
	var thisLink = links[J];

	if (thisLink.innerHTML == "<span>Water all</span>") {
		// Create water all wilting button for each topic	

		var addedNode = thisLink.cloneNode(true);

		// Check if we've found the right node - ???

		// Update node - 
		// 1. regexp replace "plant_filter=garden" with "plant_filter=wilting"
		addedNode.href=addedNode.href.replace(/garden$/, "wilting");

		// 2. Alter "Water all" text inside the span tag to say "Water wilting"
		addedNode.innerHTML="<span>Water wilting</span>";

		thisLink.parentNode.insertBefore(addedNode,thisLink);

	} else if (thisLink.innerHTML == "<span>Create a course</span>") {
		// Delete the "Create a course" button or replace it with a "Harvest all" button if there's any harvesting
		// to be done.

		// Extract current topic
		var currentTopic = thisLink.href.substring(thisLink.href.lastIndexOf("=") + 1);

		var deleteButton = 1;
		var harvestlinks = document.querySelectorAll("a");
		for (var h = 0;  h <= harvestlinks.length-1; h++) {
			if ( harvestlinks[h].innerHTML.indexOf("Harvest now") != -1  
				&& harvestlinks[h].href.indexOf("topic=" + currentTopic) != -1 ) {
					deleteButton = 0;
					break;
			}
		}

		// Check if button should be deleted or just edited
		if (deleteButton == 1) {
			// Delete button
			thisLink.parentNode.removeChild(thisLink);
		} else {
			// Modify button to harvest all	
			thisLink.href="http://www.memrise.com/cave/?topic=" + currentTopic + "&plant_filter=harvest&ltemplatename=all_old_typing";
			thisLink.innerHTML = "<span>Harvest all</span>";
		}
	}
}

