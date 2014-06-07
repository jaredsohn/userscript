// ==UserScript==
// @name        NewPosts Plus
// @namespace   DutchSaint
// @description Combines "Mark This Forum As Read" and "New Posts In New Tabs"
// @include     http://*nolinks.net/boards/search.php?action=show_new*
// @version     0.1
// @grant       GM_openInTab
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (2014-03-24) Initial Version

function newTabsForNewPosts(e) {
	// Get the list of all links on the page with "action=new" in the URL
	var new_topics = document.getElementsByClassName("newtext");
	for (var ii = 0; ii < new_topics.length; ii++) GM_openInTab(new_topics[ii].getElementsByTagName("a")[0].href);	
}

// Extract the forum id from the URL
var forum_id = document.URL.split("=").reverse()[0];
var subscribe_section = document.getElementsByClassName("subscribelink")[0];

// Change Mark Read to Mark Forum Read
subscribe_section.getElementsByTagName("a")[1].href = "misc.php?action=markforumread&fid=" + forum_id;
subscribe_section.getElementsByTagName("a")[1].text = "Mark this forum as read";

// Add Open All New Topics option
var open_tab_button = document.createElement('a');
if (forum_id != "show_new") {
	open_tab_button.href = "http://nolinks.net/boards/misc.php?action=markforumread&fid=" + forum_id;
}
else {
	open_tab_button.href = "http://nolinks.net/boards/misc.php?action=markread";
}
open_tab_button.innerHTML = "Open all topics with new posts";
open_tab_button.addEventListener("click", newTabsForNewPosts);

subscribe_section.appendChild(document.createElement('br'));
subscribe_section.appendChild(open_tab_button);

// Replace the <br>s in subscribe_link.innerHTML with " | "
// and wrap innerHTML in square brackets
subscribe_section.innerHTML = subscribe_section.innerHTML.replace(/<br>/g, " | ");