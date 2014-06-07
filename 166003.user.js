// ==UserScript==
// @name        minecraft-server.eu Vote Name
// @namespace   minecraft-server.eu
// @include     http://www.minecraft-server.eu/?go=servervote&*
// @version     1.0
// ==/UserScript==

// Dein Name für den Vote:
var name = "DeinName";


window.addEventListener ("load", function() {
	eval(changeName());	
	}, false);
	
function changeName() {
	document.getElementsByName("minecraftname")[0].value = name;	
	document.getElementsByName("minecraftname")[0].setAttribute("readonly", true, 0);
}