// ==UserScript==
// @name        Add YouTube Inbox Link Back
// @namespace   https://www.youtube.com/
// @description Puts the inbox link back on YouTube.
// @include     *://www.youtube.com/*
// @version     1.0
// ==/UserScript==

function AddInboxBack() {
	var list = document.getElementById('masthead-expanded-menu-list');
	if(list != null) {
		var li = list.children[0].cloneNode(true);
		li.children[0].href = "/inbox";
		li.children[0].innerHTML = "Inbox";
		list.appendChild(li);
	}
	else {
		console.log("Add Inbox Back: List not found. Possibly already has been added.");
	}
}

document.addEventListener('DOMContentLoaded', AddInboxBack, false);