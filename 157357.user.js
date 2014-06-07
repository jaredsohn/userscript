// ==UserScript==
// @name        PoE larger skill tree
// @namespace   http://www.pathofexile.com/passive-skill-tree/
// @description Larger skill tree
// @include     http://www.pathofexile.com/passive-skill-tree*
// @include     https://www.pathofexile.com/passive-skill-tree*
// @run-at 	document-end
// @grant       none
// @version     2.5.2
// ==/UserScript==

window.onload=function(){ main(); };

function main(){	
	jQuery(".totalPoints").after("<br />") // put a linebreak i the points used summary
		.closest("#passiveControlsForm") // go to the form without parsing the whole DOM
		.children(".clear").slice(0, 2).remove() //remove first two div.clear to force everything to be on one line
		.end() //don't search again, go to the last selection
		.parent() // move one level up
		.find("textarea, input.textInput, select") .css("width", "120px") // reduce the width of the text boxes and the dropdown menu
		.parent()
		.find("#permaLink").css("width", "100%") // the BBCode checkbox looks slightly out of place if not covered by the link
		.closest("#passiveControlsForm")
		.find(".highlightSimilarNodesContainer, .highlightShortestPathsContainer") // reduce the highlighting checkboxes' size
		.css("width", "100px");
}