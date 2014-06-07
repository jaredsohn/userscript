// ==UserScript==
// @name		Artist Blocker
// @description		Keeps you from accidentally clicking on the tavern
// @include *127.0.0.1*town_wrong.php*
// @include *kingdomofloathing.com*town_wrong.php*
// ==/UserScript==

links = document.getElementsByTagName("a");
for(i=0; i<links.length; i++) {
	if(links[i].href.indexOf("artist") != -1) {
		links[i].href = "main.php";
	}
}