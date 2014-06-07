// ==UserScript==
// @name           Remove Twitter "Who To Follow"
// @namespace      compileandrun.com
// @description    Removes the "Who To Follow" links in twitter.com, which continues to pop up the same people over and over.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// ==/UserScript==

var runCount = 0;

function performScript() {
	// Find all divs that have the tag h3
	var componentList = document.getElementsByTagName( "h3" );

	for (var i = 0; i < componentList.length; i++) {
		var component = componentList[i];
		var html = component.innerHTML;
		
		// The "Who To Follow" widget contains the text "Who to follow", so if this tag has that text, remove it.
		// Make sure that we skip the component that contains "View my profile page" so that we can still tweet the words "Who to follow"
		if( html.indexOf( "Who to follow" ) >= 0 ) {
			// Delete a few parent nodes up
			var divParent = component.parentNode;
			var divGrandparent = divParent.parentNode;
			divGrandparent.parentNode.parentNode.removeChild( divGrandparent.parentNode );
		}
    }
	
	// Run the first 25 times very quickly, then afterwards run it at a relaxed 1 second interval.
	if( runCount < 25 ) {
		window.setTimeout( performScript, 80 );
	} else {
		window.setTimeout( performScript, 1000 );
	}
	
	runCount++;
}

// Start the script's initial run.
performScript();