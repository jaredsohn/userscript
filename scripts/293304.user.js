// ==UserScript==
// @name        WGB Hide Sidebar
// @namespace   http://www.williamgibsonboard.com/*
// @description Inserts a 'Sidebar' link at the top of the page. Hiding the sidebar frees up more real estate for forum posts.
// @include     http://www.williamgibsonboard.com/forum/*
// @include     http://www.williamgibsonboard.com/topic/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

// Author: Eric Taylor
// Last Modified: 2014-01-26
// v1.00 - Initial release

// Show|Hide sets a couple of CSS options to either show or hide the sidebar on the new WGB hoopla forum.
function showhidesidebar(inputState) {
	if (document.getElementsByClassName) {
		if(document.getElementsByClassName('rightSidebar')) {
			// maincol & sidebarcol format -- the default
			//alert('sidebar detected: '+document.getElementsByClassName('rightSidebar').length);
			sb_obj = document.getElementsByClassName('rightSidebar')[0];
			main_obj = document.getElementsByClassName('leftContentBody')[0];
		} else {
			//alert('sidebar not detected!');
		}
		actions_obj = document.getElementById('sb-ACTIONS-link');

		// If we didn't get a next state, just load the current state to toggle on
		if(!inputState) {
			inputState = sb_obj.style.display;
		}
		
		// Toggle state to opposite
		if (inputState == "none") {
			//alert("showing sidebar");
			sb_obj.style.display = ""; // show sidebar again
			main_obj.style.width = "75%"; // keep main content away from sidebar space
			actions_obj.innerHTML = "Sidebar >"; // Show proper text for next action
			GM_setValue( "next_sb_ACTION_state", "none" ); // Record this so we can auto-show on the next page
		} else {
			//alert("hiding sidebar");
			sb_obj.style.display = "none"; // hide sidebar
			main_obj.style.width = "90%"; // let main content flow into sidebar space
			actions_obj.innerHTML = "< Sidebar"; // Show proper text for next action
 			GM_setValue( "next_sb_ACTION_state", "visible" ); // Record this so we can auto-hide on the next page
		}
	}
}

// This listener pulls the last value status of the ACTION sidebar and makes it the same for this page
window.addEventListener( 'load', function() { showhidesidebar( GM_getValue( "next_sb_ACTION_state" )); }, true);
	 
// This bit inserts the "Sidebar" button into the current page to the left of the Alerts button
var body_intro_content = document.getElementById('signInHeaderRightColumn');
var alert_btn = document.getElementById('alertsHeaderButton');
var sb_showhide_link = document.createElement("span");
sb_showhide_link.innerHTML = '<a id="sb-ACTIONS-link" class="signInHeaderButton" href="#">Sidebar</a>';
body_intro_content.insertBefore( sb_showhide_link, alert_btn );
var myLink = document.getElementById('sb-ACTIONS-link');
myLink.addEventListener('click', function() { showhidesidebar(); }, true);