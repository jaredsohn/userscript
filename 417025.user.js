// ==UserScript==
// @name        QuickTopic
// @namespace   DutchSaint
// @description Adds a link on the index to create a new topic
// @include     http://*nolinks.net/boards/
// @include     http://*nolinks.net/boards/index.php*
// @version     0.1
// @grant       none
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (18 Mar 2014) Initial Version

// Pass in the array of elements to use, and have the New post button properly appended to each element
function append_poster(elementSet, setType) {
	for (var ii = 0; ii < elementSet.length; ii++) {
		if (!setType) forum_id = elementSet[ii].getElementsByTagName("a")[0].href.split("=")[1];
		if (setType) forum_id = elementSet[ii].href.split("=")[1];
		
		new_topic_string = ' <a href="post.php?fid=' + forum_id + '">Post new topic</a> ] ';
		var newtexts = elementSet[ii].getElementsByClassName("newtext")[0];
	
		if (typeof newtexts == "undefined") {
			new_topic = document.createElement('span');
			new_topic.className = 'newtext';
			new_topic.innerHTML = ' [' + new_topic_string;
			
			if (!setType) elementSet[ii].appendChild(new_topic.cloneNode(true));
			if (setType) elementSet[ii].parentNode.insertBefore(new_topic.cloneNode(true), elementSet[ii].nextSibling);
		} else {
			var new_ender = ' | ' + new_topic_string;
			newtexts.innerHTML = newtexts.innerHTML.replace(']', new_ender);
		}
	}
}

// Add to document.getElementsByTagName("h3") and document.getElementsByClassName("subforum_name")
var all_forums = document.getElementsByTagName("h3");
var all_subforums = document.getElementsByClassName("subforum_name");


append_poster(all_forums, 0);
append_poster(all_subforums, 1);