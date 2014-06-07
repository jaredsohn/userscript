// ==UserScript==
// @name                rps-filter
// @version    		0.1
// @description	        Filter posts on Rock, Paper, Shotgun by tags
// @include		http://www.rockpapershotgun.com/*
// @grant       none
// ==/UserScript==


// This is the list of tag ULRs to filter
// Separate multiple tags with commas. Example: var ignoreTags =['url(1)','url(2)',...]
// Default filters Blizzard and OUYA posts (No offence to Blizzard / OUYA fans)
var ignoreTags =['http://www.rockpapershotgun.com/tag/blizzard/','http://www.rockpapershotgun.com/tag/ouya/'];

// Filter script

// Get tag paragraphs
var tagParagraphs = document.getElementsByClassName('tags');

// Loops through all the tag blocks found
for (var parIdx = 0; parIdx < tagParagraphs.length; parIdx++) {
    // Get the tags for the current tag block / article
    var tags = tagParagraphs[parIdx].getElementsByTagName('a');
    var hidden = false;	
    // Compare tags with the ignore list (could probably be done nicer
    // with a set intersection).
    for(var tagIdx = 0; tagIdx < tags.length; tagIdx++){
        for (var ignoreIdx = 0; ignoreIdx < ignoreTags.length; ignoreIdx++) {
    		// Checks for filtered tags
    		if (tags[tagIdx].href == ignoreTags[ignoreIdx]) {
               	// Mark this article for removal and skip to next article.
	           var hidden = true;
	           break;
		    }
		}
		if (hidden) {
		  break;
		}
	}
	if (hidden) {
	// Do the actual hiding.
	   tagParagraphs[parIdx].parentNode.style.display = "none";
	}
}