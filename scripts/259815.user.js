// ==UserScript==
// @name        Quibblo Delete User Button
// @namespace   quibblodeleteuser
// @description Adds a button for removing users from your friends list to quibblo.com
// @include     http://www.quibblo.com/user/*
// @exclude     http://www.quibblo.com/user/USERNAME
// @exclude     http://www.quibblo.com/user/USERNAME/*
// @version     1.0
// @grant       none
// ==/UserScript==

//All instances of USERNAME must be replaced with your Quibblo username (not your nickname)

function isFriend() {
	if (document.getElementsByClassName("icon i_user")[1].innerHTML !== undefined) {
		return true;
	} else {
		return false;
	}
} 

if (isFriend()) {
	var user = document.title.replace("'s Quibblo Profile", ""); 
	var listItem = document.createElement("li");
	listItem.setAttribute("style", "padding-left:31px;");
	document.getElementsByClassName("nav")[0].appendChild(listItem);
	delUser = document.createElement("a");
	delUser.setAttribute("href", "http://www.quibblo.com/user/USERNAME/friends/drop/?user=" + user);
	listItem.appendChild(delUser);
	var text = document.createTextNode("Delete User From Friends List");
	delUser.appendChild(text);
}
