// ==UserScript==
// @name           Reddit - Show "My Reddits" List in Sidebar
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Show all your reddits in the sidebar right under the search box, making it easier for you to navigate the site.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.0
// ==/UserScript==
(function() {
// Find searchbox's parent's parent. This is the sidebar.
var searchBox = document.getElementById("search");
var parent = searchBox.parentNode.parentNode;

// Get a list of all spacers
var spacerList = document.getElementsByClassName("spacer");

// Create a new spacer
spacer = document.createElement("div");
spacer.setAttribute("class", "spacer");

// Create a new list
newList = document.createElement("ul");
newList.setAttribute("class", "newList");

// Put the new list in the new spacer under the search box
parent.insertBefore(spacer, spacerList[1]);
spacer.innerHTML = "<h2 class=\"newSubject\">My Reddits</h2>";
spacer.appendChild(newList);

// Fill the new list with the entries from the old "My Reddits" list
var list = document.getElementsByClassName("choice");
listLength = list.length;
for (i = 0; i < listLength; i++) {
	listElement = newList.appendChild(document.createElement("li"));
	link = listElement.appendChild(list[i].cloneNode(true));
}

// Add some CSS to the list
var css = " \
	.newSubject { \
		padding: 0 0 5px 20px; \
	} \
	.newList { \
		padding: 0 0 0 30px; \
	} \
	.newList a { \
		font-size: 12px; \
	} \
	.newList a:hover { \
		text-decoration: underline; \
	} \
"; 
GM_addStyle(css);
})();