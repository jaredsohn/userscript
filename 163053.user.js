// ==UserScript==
// @name        DFC Avatar
// @namespace   kamikaze.bsdforen.de
// @description Add avatars to the DFC forum
// @include     http://www.theundreaming.com/*
// @version     4
// @grant       none
// ==/UserScript==

/* GENERIC FUNCTIONS */

function getChildByClass(node, className) {
	for (node = node.firstChild; node; node = node.nextSibling) {
		if (node.nodeType != 1) {
			continue;
		}
		if (node.getAttribute("class") == className) {
			break;
		}
	}
	return node;
}

function getUser(node) {
	return new Array(
		/* id = */ node.getAttribute("href").replace(/^[^?]*\?/, "").replace(/-.*/, ""),
		/* name = */ node.getAttribute("href").replace(/^[^?]*\?/, "").replace(/[^-]*-/, ""),
		/* url = */ node.getAttribute("href"));
}

/* THREAD VIEW */

function getPostUser(node) {
	node = getChildByClass(node, "username_container");
	node = node.getElementsByTagName("a")[0];
	return getUser(node);
}

function updatePostBadge(node) {
	var nodes = node.getElementsByTagName("a");
	for (var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if (node.getAttribute("class") == "postuseravatar") {
			node.setAttribute("class", "postuserbadge");
			node = node.getElementsByTagName("img")[0];
			node.setAttribute("alt", node.getAttribute("alt").replace(/Avatar/, "Badge"));
			node.setAttribute("title", node.getAttribute("alt"));
			return;
		}
	}
}

function addPostAvatar(node) {
	if (node.getAttribute("class") != "userinfo") {
		return;
	}
	var user = getPostUser(node);
	var id = user[0];
	var name = user[1];
	var href = user[2];
	var src = "image.php?type=profile&u=" + id;
	
	var avatar = document.createElement("img");
	avatar.setAttribute("alt", name + "'s Avatar");
	avatar.setAttribute("title", avatar.getAttribute("alt"));
	avatar.setAttribute("src", src);
	
	var link = document.createElement("a");
	link.setAttribute("class", "postuseravatar");
	link.setAttribute("href", href);
	
	link.appendChild(avatar);

    updatePostBadge(node);
	node.insertBefore(link, node.getElementsByTagName("hr")[0]);
}

function postNodeAdded(e) {
	var users = e.target.getElementsByTagName("div");
	for (var i = 0; i < users.length; i++) {
		addPostAvatar(users[i]);
	}
}

var posts = document.getElementById("posts");
if (posts) {
	document.styleSheets[0].insertRule(".postuserbadge {position: absolute; top: 3.333333px; right: 3.333333px;}", 1);
	document.styleSheets[0].insertRule(".postuserbadge img {width: 50%; float: right;}", 1);
	
	var users = posts.getElementsByTagName("div");
	for (var i = 0; i < users.length; i++) {
		addPostAvatar(users[i]);
	}
	posts.addEventListener("DOMNodeInserted", postNodeAdded, false);
}

/* USER ACTIVITY */

function getActivityUser(node) {
	node = node.getElementsByTagName("a")[0];
	return getUser(node);
}

function updateActivityAvatar(node) {
	if (getChildByClass(node, "avatar") == null) {
		return;
	}
	var user = getActivityUser(node);
	var id = user[0];
	var name = user[1];
	var href = user[2];
	var src = "image.php?type=profile&u=" + id;
	
	var avatar = getChildByClass(node, "avatar");
	avatar = avatar.getElementsByTagName("img")[0];
	avatar.setAttribute("src", src);
}

function updateFriendLink(node) {
	if (node.getAttribute("class") != "image_friend_link") {
		return;
	}

	var user = getUser(node);
	var id = user[0];
	var name = user[1];
	var href = user[2];
	var src = "image.php?type=profile&u=" + id;
	
	var avatar = node.getElementsByTagName("img")[0];
	avatar.setAttribute("src", src);
}

function updateFriendAvatar(node) {
	node = getChildByClass(node, "image_friend_link");
	if (node == null) {
		return;
	}
    updateFriendLink(node);
}

function activityNodeAdded(e) {
	updateActivityAvatar(e.target);
	updateFriendAvatar(e.target);
}

var activity = document.getElementById("userprof_content_container");
if (activity) {
	document.styleSheets[0].insertRule("#userprof_content_container .avatar img {max-width: 100%;}", 1);

    var posts = activity.getElementsByTagName("li");
	for (var i = 0; i < posts.length; i++) {
		updateActivityAvatar(posts[i]);
	}
	
	var friends = document.getElementsByTagName("a");
	for (var i = 0; i < friends.length; i++) {
		updateFriendLink(friends[i]);
	}
	
	activity.addEventListener("DOMNodeInserted", activityNodeAdded, false);
}


