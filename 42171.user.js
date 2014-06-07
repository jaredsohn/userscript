// This is a port of 'Super Duper iGoogle' which was a port of 'Super iGoogle'
// The intention behind 'Super Sidebar iGoogle' was to create a port that played nicely with the sidebar (which of course is replacing the tab bar)
// The differences between 'Super Sidebar iGoogle' and 'Super Duper iGoogle' are as follows;
// 	1. 'Super Duper iGoogle' added a regression back to the old RSS format and linked the username at the top right to gmail's composer; these things seemed beyond the scope of this script and I removed them for the sake of fine tuned customization.
//	2. 'Super Duper iGoogle' created a mini-form at the end of the tab bar, but this didn't work with the sidebar since there 'is' no tab bar and so I removed it.
//	3. 'Super Duper iGoogle' rounded the corners of tabs; now the sidebar tabs are already rather round, so when the function didn't effect them I simply removed the funcionality.
//	4. 'Super Duper iGoogle' hid the sidebar when the header was toggled off; this made it rather difficult to switch between tabs or widgets; so I kept the sidebar visible at all times.
//	5. I added a better 'included pages' definition as 'Super Duper iGoogle' only had http://www.google.com
// If there are any problems, feel free to contact me!
//
// Version 1.0 : Freshly ported and there appears to be no bugs :)
//
// ==UserScript==
// @name Super Sidebar iGoogle
// @author Prurigro (original: Michael R. Hines, Richard Coombs)
// @description This removes the header + footer and allows the header to be toggled on/off. Important links are moved to the top right and the sidebar is always visible.
// @include http://google.com/ig*
// @include http://www.google.com/ig*
// ==/UserScript==


var headerHidden = false;	// True if header is hidden, false otherwise
var oldForm;	// Variable to hold duplicate copy of original search form to be used when "toggle header" is clicked
var init = false;	// True if this script has finished initialising, false otherwise

toggleHeader();
hideFooter();
modifyLinkBar();

init = true;

/* 
 * and add "Toggle Header" and "Add Stuff" links to top-right corner
*/
function modifyLinkBar() {
	// Find top-right links (sign out, my account etc) and email address and "classic home" link
	var guser = document.getElementById('guser');
	var toprightlinks;
	if (guser) toprightlinks = guser.firstChild;
	
	if (toprightlinks) {
		var classic = toprightlinks.childNodes[2];	// "Classic home" link

		// Create "Toggle Header" button
		var toggleBtn = document.createElement('a');
		toggleBtn.appendChild(document.createTextNode("Toggle Header"));
		toggleBtn.addEventListener("click", toggleHeader, false);
		toggleBtn.setAttribute("href", '#');
		toprightlinks.insertBefore(toggleBtn, classic);
		toprightlinks.insertBefore(document.createTextNode(" | "), classic);

		// Move the "add stuff" link and a new spacer to top-right bar
		var addstuff = document.getElementById("addstuff");
		var addstufflink = addstuff.lastChild;
		addstufflink.textContent = "Add Stuff";
		toprightlinks.insertBefore(addstufflink, classic);
		toprightlinks.insertBefore(document.createTextNode(" | "), classic);
	}
}

// Function to toggle whether the header is displayed or not
function toggleHeader() {
	// Toggle display state of header div
	var elm = document.getElementById('artist_campaign_icon_panel');
	if (elm) elm.style.display = (headerHidden ? '' : 'none');

	var elm = document.getElementById('nhdrwrapsizer');
	if (elm) elm.style.display = (headerHidden ? '' : 'none');

        var elm = document.getElementById('nhdrwrapinner');
	if (elm) elm.style.display = (headerHidden ? '' : 'none');
	
	headerHidden = !headerHidden;
	
	// Focus on search field
	var q = document.getElementById("q");
	if (q) q.focus();	
}

function hideFooter() {
	// Hide footer

	var elm = document.getElementById('footerwrap');

	if(elm) elm.style.display = 'none';

	// Change amount of space at bottom of page

	var elm = document.getElementById('modules');

	if(elm) elm.style.marginBottom = '-2em' ;
}
