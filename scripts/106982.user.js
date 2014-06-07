// ==UserScript==
// @name           Remove Facebook Elements
// @author         just1nw
// @version        0.2
// @description    Removes Annoying Facebook Elements.
// @include        *facebook.com*
// @namespace		tag:just1nw,2011-07-16:Geneva
// @require			http://code.jquery.com/jquery-1.3.min.js
// ==/UserScript==

Remove_Facebook_Elements();

/*
*	This function uses the JQuery library to select different
*	Facebook elements to hide from the page.
*/
function Remove_Facebook_Elements() {

	//1. Remove the default Facebook ticker from the right sidebar
	/*
	*	Uses the pagelet_tickeruxxxx_x ID to hide the sidebar. This ID is
	*	dynamically generated so we need to use a wildcard selection approach.
	*/
	$("div[id^=pagelet_tickeru]").hide();
	//$("div[id=pagelet_ticker]").hide();
	$("div[class^=fbFeedTicker]").hide();
		//I chose to hide the fbFeedTicker instead of the pagelet_ticker since it
		//hid the activity feed while keeping the friend list from expanding all the
		//way to the top of the browser window, which looked pretty messy to me.
	
	//2. Remove Homepage Ads
	/*
	*	Uses the ego_column class to remove the ads. As of right now, shouldn't
	*	affect legitimate sidebar content.
	*/
	$("div[class=ego_column]").hide();
	
	//3. Remove Facebook Links Below Chat Widget In Left Sidebar
	/*
	*	Uses the pageSidenavFooter to delete the HTML for the links
	*/
	$("div[id=pageSidenavFooter]").hide();
	

}//End Remove_Facebook_Elements

/*
*	Adds an Event Listener to detect Facebook page transitions and reapply the
*	hidden style to the page.
*/
document.addEventListener("DOMNodeInserted", Remove_Facebook_Elements, true);
