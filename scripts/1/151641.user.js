// ==UserScript==
// @name        KG - forum names link to tracker usersearch
// @namespace   KG
// @include     http*://forum.karagarga.net/index.php?showtopic=*
// @include	http*://forum.karagarga.net/index.php?*do=showConversation*
// @grant	none
// @version     0.3
// ==/UserScript==

var names = document.querySelectorAll("a.fn");

for (i=0; i < names.length; i++) {
	var name = names[i];
	var searchString = name.textContent;
	var newLink = document.createElement("a");
	newLink.textContent = "[t]";
	newLink.style.fontWeight = "normal";
	newLink.style.fontSize = "80%";
	newLink.style.marginLeft = ".2em";
	newLink.href = "https://karagarga.net/users.php?user=" + searchString;
	name.parentNode.appendChild(newLink);
}