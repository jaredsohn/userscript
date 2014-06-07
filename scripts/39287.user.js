// ==UserScript==
// @name           TVFreeload Link Rewriter
// @description    Rewrites TVFreeload's TV/Movie/Anime index links to point directly to their respective forum threads
// @include        http://tvfreeload.com/Download/*

/*	
	Script History
	
	v. 1.0 - 2008-12-26 Initial version
*/

// ==/UserScript==

(function() {

var allForms, thisForm;
allForms = document.getElementsByTagName("form");

while (allForms.length > 0) {
// For some reason, this array re-updates(??), so we just keep examining the first link in the queue until they're all gone
	thisForm = allForms[0];

	var showURL = "";
	var showTitle = "";
	
	if (thisForm.hasChildNodes()) {
		for (var j=0; j < thisForm.childNodes.length; j++) { // Search the input sub-tags for the needed
			if (thisForm.childNodes[j].name == "showURL") showURL = thisForm.childNodes[j].value;
			if (thisForm.childNodes[j].name == "showTitle") showTitle = thisForm.childNodes[j].value;
		}
		if (showURL != "" && showTitle != "") {		
			var newLink = document.createElement("a");
			newLink.innerHTML = '<strong><a href="'+showURL+'>'+showTitle+'</a></strong>';
			thisForm.parentNode.replaceChild(newLink, thisForm); // Swap 'em, one for the other
			
			
		}
		
	}
}
})();