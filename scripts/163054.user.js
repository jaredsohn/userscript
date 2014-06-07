// ==UserScript==
// @name        DFC Anti-PC
// @namespace   kamikaze.bsdforen.de
// @description Remove post count from DFC forums
// @include     http://www.theundreaming.com/*
// @version     2
// @grant	none
// ==/UserScript==

function removePC(node) {
	if (node.getAttribute("class") != "userinfo_extra") {
		return;
	}
	for (var entry = node.firstChild; entry != null; entry = entry.nextSibling) {
		if (entry.nodeName != "DT") {
			continue;
		}
		if (entry.firstChild.data == "Posts") {
			node.removeChild(entry.nextSibling);
			node.removeChild(entry.nextSibling);
			node.removeChild(entry);
		}
	}
}

function nodeAdded(e) {
	var details = e.target.getElementsByTagName("dl");
	for (var i = 0; i < details.length; i++) {
		removePC(details[i]);
	}
}

var posts = document.getElementById("posts");
if (posts) {
	var details = posts.getElementsByTagName("dl");
	for (var i = 0; i < details.length; i++) {
		removePC(details[i]);
	}
	posts.addEventListener("DOMNodeInserted", nodeAdded, false);
}

