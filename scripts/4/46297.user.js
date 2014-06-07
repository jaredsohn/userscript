// ==UserScript==
// @name           Adobe Forums: Show|Hide ACTIONS
// @namespace      http://adobeforums.adobe.com/thread
// @description    Inserts a 'Show|Hide ACTIONS' link above the ACTIONS sidebar. Hiding the sidebar frees up more real estate for forum posts.
// @include        http://forums.adobe.com/community/*
// @include        http://forums.adobe.com/thread/*
// @include        http://forums.adobe.com/message/*
// ==/UserScript==

// Author: Eric Taylor
// Last Modified: 2009-04-10
// v1.01 - Dynamic updating of "Show/Hide" text + stole arrows off jive-pagination too
// v1.00 - Initial release

// Show|Hide sets a couple of CSS options to either show or hide the ACTIONS sidebar in Jive.
function showhidesidebar(inputState) {
	if (document.getElementById) {
		if(document.getElementById('jive-body-sidebarcol-container')) {
			// maincol & sidebarcol format -- the default
			//alert('standard sidebarcol format detected');
			sb_obj = document.getElementById('jive-body-sidebarcol-container');
			main_obj = document.getElementById('jive-body-maincol');
		} else if(document.getElementById('jive-body-layout-ls')) {
			// layout-l & layout-s format -- seems to occur when there are stickies
			//alert('stickies format detected');
			sb_obj = document.getElementById('jive-widget-container_2');
			main_obj = document.getElementById('jive-widget-container_1');
		} else {
			//alert("Can't find sidebarcolumn");
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
			main_obj.style.margin = "0 245px 0 0"; // keep main content away from sidebar space
			actions_obj.innerHTML = "Hide ACTIONS"; // Show proper text for next action
			actions_obj.setAttribute("class", "jive-pagination-next"); // Steal arrow from jive-pagination
			GM_setValue( "next_sb_ACTION_state", "none" ); // Record this so we can auto-show on the next page
		} else {
			//alert("hiding sidebar");
			sb_obj.style.display = "none"; // hide sidebar
			main_obj.style.margin = "0 0 0 0"; // let main content flow into sidebar space
			actions_obj.innerHTML = "Show ACTIONS"; // Show proper text for next action
			actions_obj.setAttribute("class", "jive-pagination-prev"); // Steal arrow from jive-pagination
 			GM_setValue( "next_sb_ACTION_state", "" ); // Record this so we can auto-hide on the next page
		}
	}
}

// This listener pulls the last value status of the ACTION sidebar and makes it the same for this page
window.addEventListener( 'load', function() { showhidesidebar( GM_getValue( "next_sb_ACTION_state" )); }, true);
	 
// This bit inserts the "Show/Hide ACTIONS" link into the current page at the end of the jive-body-intro-content
var body_intro_content = document.getElementById('jive-body-intro-content');
var sb_showhide_link = document.createElement("div");
sb_showhide_link.innerHTML = '<span class="jive-pagination" style="font-size:.75em; font-weight:bold; margin-top:11px; float:right;"><span class="jive-pagination-prevnext"><a id="sb-ACTIONS-link" href="#"></a></span></span>';
body_intro_content.appendChild( sb_showhide_link );
var myLink = document.getElementById('sb-ACTIONS-link');
myLink.addEventListener('click', function() { showhidesidebar(); }, true);