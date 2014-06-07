// ==UserScript==
// @name        New Tabs for New Posts
// @namespace   DutchSaint
// @description Opens all topics with new posts in separate tabs and then marks all topics as read
// @include     http://*nolinks.net/boards/search.php*
// @version     0.1
// @grant       GM_openInTab
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (13 Mar 2014) Initial Version

// Looks like opening a link in a new tab (and guaranteeing it to not open in a new window) isn't possible
// with plain Javascript. Fortunately, Greasemonkey has a function to handle this.

function newTabsForNewPosts(e) {
	// Get the list of all links on the page with "action=new" in the URL
	var new_topics = document.getElementsByClassName("newtext");
	for (var ii = 0; ii < new_topics.length; ii++) GM_openInTab(new_topics[ii].getElementsByTagName("a")[0].href);	
}

// If the user is clicking "New posts" instead of using the "New Topic" page, extract the forum id
var forum_id = document.URL.split("=").reverse()[0];

var open_tab_button = document.createElement('a');
if (forum_id != "show_new") {
	open_tab_button.href = "http://nolinks.net/boards/misc.php?action=markforumread&fid=" + forum_id;
}
else {
	open_tab_button.href = "http://nolinks.net/boards/misc.php?action=markread";
}
open_tab_button.innerHTML = "Open all topics with new posts";
open_tab_button.addEventListener("click", newTabsForNewPosts);

document.getElementsByClassName("subscribelink")[0].appendChild(document.createElement('br'));
document.getElementsByClassName("subscribelink")[0].appendChild(open_tab_button);