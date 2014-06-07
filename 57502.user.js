// ==UserScript==
// @name          Ad-free Facebook v1.0
// @namespace  http://www.docwatsonphd.com
// @description   Finds "home_sponsor_nile" div on Facebook and removes it. Also kills ads on profiles and wall-to-wall (via Clean Facebook Sidebar 1.7)
// @include         http://www.facebook.com/*
// ==/UserScript==

// TODO: Make this thing not so hard-coded.
// For the home page of Facebook--Kills that blasted "Sponsored" thing

// Get the parent of the offending node
var parent = document.getElementById("home_sponsor_nile").parentNode;

// Kill the parent of the offender by having ITS parent remove the offender parent.
parent.parentNode.removeChild(parent);

// Kill the ads on profiles + wall-to-wall
// From "Clean Facebook Sidebar v1.7" by Juan Ojeda 
// http://userscripts.org/scripts/show/57290
//checks which page you're on and uses the right function...
function listeners() {
	// if on feed page (home page)...
	if (document.getElementById('home_sidebar')) {
		document.getElementById('home_sidebar').addEventListener("DOMNodeInserted", 
	
	cleanFeedSidebar, true);
	}
	// if on profile page or wall-to-wall...
	if(document.getElementById('sidebar_ads')) {
		document.addEventListener("DOMNodeInserted", cleanProfileSidebar, true);
	}
}

//add function to page !!important!!
document.addEventListener("DOMNodeInserted", listeners, true);
