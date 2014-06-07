// ==UserScript==
// @name          New York Times Link to Print
// @namespace     http://www.nytimes.com
// @description   Automatically links to the printer-friendly version of articles on nytimes.com, opens them in a new window (if you're navigating from the home page or a category page), and adds a link to the print version which leads back to the regular version.  Also re-directs articles linked from RSS to their print version.
// @include       http://*nytimes.com*
// ==/UserScript==

//
// This was designed to work with the "multi-column articles" script available here: 
// http://userscripts.org/scripts/show/9022
// but can also work on its own.
//


// Get the current window location
var curLoc = window.location.href;
// Get all links on the current page
var anchs = document.getElementsByTagName('a');


// ------------------------------------------------------------------------
// Redirect any articles linked to from RSS directly to thier print version
// ------------------------------------------------------------------------
if (curLoc.indexOf('emc=rss') != -1  && curLoc.indexOf('pagewanted=print') == -1) {
	var newLoc = curLoc.replace('emc=rss','emc=rss&pagewanted=print');
	window.location.replace(newLoc);
}



// ----------------------------------------------------------------------------------------------------
// Modify anchors so that links to articles go directly to their print version and open in a new window
// ----------------------------------------------------------------------------------------------------
// Loop through all links on the page
for (var i=0; i<anchs.length; i++) {
	var node = anchs[i];
	curHref = node.getAttribute('href');

	// Check to make sure the link has an href
	if (curHref != null) {
		
		// Check if the link has a date associated with it, meaning it's a regular NYT article
		if (curHref.indexOf('nytimes.com') != -1) {
			var posDate = curHref.indexOf('nytimes.com');
			var strYear = curHref.substring(posDate+12,posDate+15);
			var strMon = curHref.substring(posDate+17,posDate+18);
			var strDay = curHref.substring(posDate+20,posDate+21);
			if (strYear == String(parseInt(strYear)) && strMon == String(parseInt(strMon)) && strDay == String(parseInt(strDay))) {
				var hasDate = 1;
			} else {
				var hasDate = -1;
			}
		}
		
		// Check if the link is an article from the AP
		if (curHref.indexOf('aponline') != -1 && curHref.indexOf('index.html') == -1) {
			var fromAP = 1;
		} else {
			var fromAP = -1;
		}
		
		// Check if the link is an article from Reuters
		if (curHref.indexOf('reuters') != -1 && curHref.indexOf('index.html') == -1) {
			var fromReut = 1;
		} else {
			var fromReut = -1;
		}
		
		// Check if any of the three conditions are met
		if (hasDate == 1 || fromAP == 1 || fromReut == 1) {
			
			// Set link to go directly to the print version
			if (curHref.indexOf('?') == -1) {
				node.setAttribute('href', curHref+'?pagewanted=print');
			} else {
				node.setAttribute('href', curHref+'&pagewanted=print');
			}

			// Set article to open in a new window, if you're currently on the home page or a category page
			if (curLoc.indexOf('.html') == -1 || curLoc.indexOf('/pages/') != -1) {
				node.setAttribute('target', '_blank');
			}
			
		}
	}
}



// -----------------------------------------------------------------------------------------
// Adds a link to print versions which leads back to the regular version of the same article
// -----------------------------------------------------------------------------------------
if (curLoc.indexOf('pagewanted=print') != -1) {
	
	// Get the div containing the author's name
	var allDiv = document.getElementsByTagName('div');
	for (i=0; i<allDiv.length; i++) {
		var node = allDiv[i];
		if (node.getAttribute('class') == 'byline') {
			var divBy = node;
		}
	}
	
	// Set the leading and trailing text for the link
	var spacerText = document.createTextNode(', (');
	var endText = document.createTextNode(')');
	
	// Create a new node for the link
	var newLink = document.createElement('a');
	newLink.setAttribute('href',curLoc.substring(0,curLoc.indexOf('?')));
	var linkText = document.createTextNode('article');
	newLink.appendChild(linkText);
	
	// Add the link
	divBy.appendChild(spacerText);
	divBy.appendChild(newLink);
	divBy.appendChild(endText);
}