// ==UserScript==
// @name           Helgon.net arrow keys
// @namespace      http://henrik.nyh.se
// @description    Use left and right arrow keyboard keys to navigate Helgon.net. Should work on any page with previous/next links (gallery items, diary entries) and subpages ("Visar sida: 1 [2] 3").
// @include        http://*helgon.net/*
// ==/UserScript==

// Key codes

	var leftArrow = 37;  // Left arrow key
	var rightArrow = 39;  // Right arrow key


// Listen for key presses

	window.addEventListener('keydown', function(event) {
	
		if (inForm)  // Don't do anything if a form is focused
			return;
	
		var keyCode = event.which;  // The key pressed
		
		// If an arrow is pressed and an appropriate link has been extracted, go there
		if (keyCode == leftArrow && leftArrowLink)
			location.href = leftArrowLink;
		else if (keyCode == rightArrow && rightArrowLink)
			location.href = rightArrowLink;
	
	}, true);


// Make sure form element focus invalidates keycuts

	var form_elements = document.evaluate("//INPUT | //TEXTAREA", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var inForm = false;  // By default we're not in a form
	
	for (var i = 0; i < form_elements.snapshotLength; i++) {  // Loop through input fields and textareas
	
		inForm = true;  // If there are input fields, they are typically autofocused without triggering onfocus, so change default
	
		var node = form_elements.snapshotItem(i);  // This node
		
		// When element is focused, we're in a form
		node.addEventListener('focus', function(e) {
			inForm = true;
		}, true);
		
		// When element is unfocused, we're not in a form
		node.addEventListener('blur', function(e) {
			inForm = false;
		}, true);
		
	}

// Find previous/next links

	var as = document.getElementsByTagName("a");  // Get all links

	var a, leftArrowLink, rightArrowLink;
	
	for (i = 0; i < as.length; i++) {  // Loop through all links
	
		a = as[i];  // This link
		
		if (a.href.indexOf('ction=prev') != -1)  // A "previous" link!
			leftArrowLink = a.href;  // Store it
		
		if (a.href.indexOf('ction=next') != -1)  // A "next" link!
			rightArrowLink = a.href;  // Store it
			
	}

// Find subpages

	textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  // All text nodes
	    
	for (var i = 0; i < textnodes.snapshotLength; i++) {  // Loop through text nodes
	    node = textnodes.snapshotItem(i);  // This text node
	    s = node.data;  // Its contents
	    
	    if (s.indexOf('Visar sida:') != -1) {
	    
	    	// We found "Visar sida:"

			// The parent node is the subpage cell
	    	var subpageCell = node.parentNode;

			// Find all subpage links
	    	as = subpageCell.getElementsByTagName("a");
	    	
			for (i = 0; i < as.length; i++) {  // Loop through subpage links
			
				if (location.href == as[i].href) {
				
					// Found the current page
					
					if (i)  // If we're not at the first link, the previous link goes to the previous page
						leftArrowLink = as[i-1];
					
					if (i < as.length)  // If we're nog at the last link, the next link goes to the next page
						rightArrowLink = as[i+1];
						
					return;  // We can stop looking
				
				}
	   
			}
		    
			// If we still haven't found anything, then we must be on the first page
			rightArrowLink = as[1];
	    	
	    	return;  // No need to loop through any further text nodes
	  	}
		
	}
