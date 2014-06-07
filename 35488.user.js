// ==UserScript==
// @name          Merlin Mogrifier
// @namespace     http://hazexp.wordpress.com/
// @description   Removes every third word in each of Merlin's posts in GP Forums
// @include       http://gpforums.co.nz/*
// @include		  http://www.gpforums.co.nz/*
// ==/UserScript==

var allUserDivs, thisUserDiv, merlin_tr,
	merlin_postbody, count, tempNode,
	tempNodeValue, tempPostStrings, merlin_posts;

// Setting the word counter to 1, because the first word to be
// encountered will be the first word out of each three to be removed.
// I am too cool to index from zero lolz
count = 1;

// Selecting an array of values from the document.
// This should match all of the divs containing the user names on the page.
allUserDivs = document.evaluate(
    "//div[@class='pUserName']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allUserDivs.snapshotLength; i++) {
	
	// Setting the current node in the allUserDivs array to thisUserDiv
	thisUserDiv = allUserDivs.snapshotItem(i);
    
    // If the temporary variable matches Merlin, then process the following code
	if (thisUserDiv.firstChild.nodeValue == "marzbar") {		
		
		// This is setting the parent table row to merlin_tr.
		// The purpose of this is so that we may traverse from it so that
		// the post body can be manipulated.
		merlin_tr = thisUserDiv.parentNode.parentNode;
		
		// Simply traversing down the tree so that the body of the post is selected.
		merlin_postbody = merlin_tr.childNodes[3].childNodes[3];

		// Splitting the node into pieces of text, thanks DOM!
		for (var j = 0; j < merlin_postbody.childNodes.length; j++) {

			// Selecting the value held by pieces of text in his posts
			tempNode = merlin_postbody.childNodes[j];
			tempNodeValue = merlin_postbody.childNodes[j].nodeValue;
		
			// If the childNode is not null then it must contain some text
			// that may be parsed, even if is is whitespace like \n
			if (tempNodeValue != null) {
			
				// Splitting all of the words in the string by a space
				tempPostStrings = tempNodeValue.split(" ");
			
				// Iterating through the string removing as we go
				for (var k = 0; k < tempPostStrings.length; k++) {
			
					// If count is three, then the third word has been found, and as
					// a result, the word should be removed
					if (count == 3) {
						tempPostStrings[k] = null;
						count = 0;
					}
				
					count++;
				}
				
				// Ensuring that a tempNodeValue is not null, and can therefore
				// perform string concatenation upon it.
				tempNodeValue = "";
		
				// Looping through all of the words in the text node
				for (var l = 0; l < tempPostStrings.length; l++) {
			
					// If the string has not been removed, print it out, with a space
					// appearing between each word, because our string.split delimiter
					// removed the spaces that we needed to make the text readable		
					if (tempPostStrings[l] != null) {
						tempNodeValue += (tempPostStrings[l] + " ");
					}
				}

				// Finally assigning the modified text back to the node from whence
				// it came		
				tempNode.nodeValue = tempNodeValue;
					
			} // END NON-EMPTY TEXT STRING
		} // END TEXT NODE LOOP
	} // END MERLIN POST
}
