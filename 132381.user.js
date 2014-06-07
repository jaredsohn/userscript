// ==UserScript==
// @name           Remove as Scratch friend
// @namespace      Scratch,Scimonster
// @description    Adds a link to remove the user from your friends list when visiting a Scratcher's user page, if they are on your list.
// @include        http://scratch.mit.edu/users/*
// @exclude        http://scratch.mit.edu/users/*/*
// ==/UserScript==
// only run if on friends list
friend = !(document.getElementById("divFriendReq"));
if (friend) {
	// get user ID
	var uID = document.getElementById("user").getElementsByTagName("img")[0].src;
	uID = uID.split("/"); uID = uID[uID.length-1]; uID = uID.substring(0, uID.indexOf("_"));
	// add element to remove from friends list
	var link = document.createElement("a");
	document.getElementById("user").lastChild.previousSibling.appendChild(link);
	//alert(document.getElementById("user").lastChild.previousSibling)
	link = document.getElementById("user").lastChild.previousSibling.lastChild;
	link.innerHTML = "Remove from friends list";
	link.href = "/users/removefriend/"+uID;
}