// ==UserScript==
// @name		Tavern Blocker
// @description		Keeps you from accidentally clicking on the tavern
// @include *127.0.0.1*woods.php*
// @include *kingdomofloathing.com*woods.php*
// ==/UserScript==

links = document.getElementsByTagName("a");
for(i=0; i<links.length; i++) {
	if(links[i].href..match(/snarfblat=25$/)) {
		links[i].href = "main.php";
	}
}