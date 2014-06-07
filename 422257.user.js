// ==UserScript==
// @name        New Subforum Posts
// @author		Shadow Thief
// @namespace   DutchSaint
// @description Provides a [ New posts ] link for subforums
// @include     http://*nolinks.net/boards/
// @include     http://*nolinks.net/boards/index.php*
// @include		http://*nolinks.net/boards/search.php*
// @version     0.1
// @grant		none
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (21 Mar 2014) Initial version

// If the icon is class "icon icon-new" and there is no "[ New posts ]" button,
// one of the subforums has new posts. In this case, add a "[ New posts ]"
// button to the subforum section. When it's clicked on, iterate through the
// subforums until the one with new posts is found.

var new_posts = document.getElementsByClassName("icon-new");
for (var ii = 0; ii < new_posts.length; ii++) {
	if (typeof new_posts[ii].parentNode.getElementsByClassName("newtext")[0] == "undefined") {
		// Get the forum id of the first subforum
		var first_subforum = new_posts[ii].parentNode.getElementsByClassName("subforum_name")[0];
		if (typeof first_subforum == "undefined") continue;
		var first_forum_id = first_subforum.href.split("=")[1];
		
		// Generate a [ New posts ] button after the list of subforums
		var new_topic_string = ' [ <a href="search.php?action=show_new&fid=' + first_forum_id + '">New posts</a> ]';
		var new_topic = document.createElement('span');
		new_topic.className = 'newtext';
		new_topic.innerHTML = new_topic_string;
		// first_subforum.parentNode.insertBefore(new_topic.cloneNode(true), first_subforum.nextSibling);
		first_subforum.parentNode.appendChild(new_topic.cloneNode(true));
	}
}

// If the subforum has no new posts, go to the next one in the list
if (location.pathname == "/boards/search.php") {
	var main_url = window.location.href.split("&")[0];
	var sub_forum = window.location.href.split("&")[1];
	var info_box = document.getElementsByClassName("icon-new")[0];
	if (typeof info_box == "undefined") {
		if (sub_forum == "fid=85") window.location.href = main_url+"&fid=29";
		if (sub_forum == "fid=23") window.location.href = main_url+"&fid=42";
		if (sub_forum == "fid=42") window.location.href = main_url+"&fid=41";
	}
}