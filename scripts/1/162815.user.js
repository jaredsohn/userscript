// ==UserScript==
// @name        Zombie Pirate Solution
// @namespace   a
// @include	    http://127.0.0.1:*/charpane.php
// @include     http://*.kingdomofloathing.com/charpane.php
// @include     localhost:*.kingdomofloathing.com/charpane.php
// @grant       none
// ==/UserScript==

//Zombie Pirate Solution
//by Lightwolf

// Replaces the normal pirate outfit avatar with the zombie version when you are in a Zombie Slayer run

var body = document.getElementsByTagName("body");
body = body[0];
var html = body.innerHTML;

if (html.match("Zombie Master"))
{

	if (html.match("piratecostume.gif"))
	{
		body.innerHTML = body.innerHTML.replace("/otherimages/piratecostume.gif", "/otherimages/zombiepiratecostume.gif");
	}
	else if (html.match("zombiepiratecostume_f.gif"))
	{
		body.innerHTML = body.innerHTML.replace("/otherimages/piratecostume_f.gif", "/otherimages/zombiepiratecostume_f.gif");
	}
	else{
	}	
	
} else {
}	