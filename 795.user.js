// ==UserScript==
// @name          phpBB Avatar Suppression
// @description	  Removes posters' avatars on phpBB fora.
// @include       *
// @exclude       

// by Josh Wheeler (deltalima@gmail.com)
// Based on code from "phpBB Signature Hider" by Michael Tandy
// ==/UserScript==


(function() {
	// Get all the tags that start with "span".
	var allspans = document.getElementsByTagName("SPAN");
	// For loop to parse through the tags to see if it is a "postdetails" container.
	for (var i = 0 ; i < allspans.length ; i++) {
		var SpanChildNodes = allspans[i].childNodes;
		// If the class is "postdetails', then it contains the avatar so drop down
		// into the avatar-replacing for-loop.
		if(allspans[i].className == "postdetails") { 
			for (var j = 0; j < SpanChildNodes.length; j++) {
				// If the node is an image, replace it with a text node.
				if(SpanChildNodes[j].nodeName == "IMG") {
					replacementTextNode = document.createTextNode("Avatar removed");
					SpanChildNodes[j].parentNode.replaceChild(replacementTextNode, SpanChildNodes[j]);
				}
			}
		}
	}
})();