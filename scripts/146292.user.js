// ==UserScript==
// @name DragonFable FlashVars Detector
// @description Detects what the FlashVars of DragonFable is :D
// @grant none
// @include http://dragonfable.battleon.com/game/
// @require http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==

/*
Tool(s) used to code this thing:
-Notepad++

Acknowledgement(s):
-MarvinCorp for Coding the whole thing!

Property of MarvinCorp!
Feel free to modify the code below... as you desire :D
But please, don't forget to give some credit to the
person who coded it :)
*/

function getFlashVars(){
	var parent = document.getElementById("main");
	var element = parent.getElementsByTagName("span")[0];
	var flashvars = element.innerHTML;
	flashvars = flashvars.split(" (Requires Flash 8 or higher)");
	flashvars = flashvars.toString();
	flashvars = flashvars.split("Build ");
	flashvars = flashvars.join("");
	flashvars = flashvars.toString();
	flashvars = flashvars.split(".");
	flashvars = flashvars.join("_");
	flashvars = flashvars.toString();
	flashvars = "strFileName=game" + flashvars + ".swf"
	flashvars = flashvars.split(",");
	flashvars = flashvars.join("");
	flashvars = flashvars.toString();
	return flashvars;
}

function getMovie(movieName){
	var embed = document.getElementsByTagName("embed")[0];
	return embed.src;
}

function init(){
	var flashvars = getFlashVars();
	var base = window.location.href;
	var movie = getMovie("gamefiles/core.swf");

	alert(
	"===[DragonFable SWF Info]===" + 
	"\nBase: " + base +
	"\nMovie: " + movie +
	"\nFlashVars: " + flashvars +
	"\n\nDesigned and Made By MarvinCorp :D"
	);
}

setTimeout(init, 2000);