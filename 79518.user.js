// ==UserScript==

// @name           BYU.edu Tweaks
// @namespace      MouseKeys

// @description    Tweaks for BYU.edu

// @include        http://*byu.edu*

// @author	   Brice Johnson
//		   With much code borrowed from "Facebook keyboard navigation" by DrollTroll
// ==/UserScript==

function OnKeyUp(e)
{
  key_map = {	"C" : "index.php",
		"T" : "travel.php",
		"I" : "inventory.php",
		"S" : "cheeseshoppe.php",
		"F" : "huntersgroup.php",
		"P" : "hunterprofile.php",
		"R" : "scoreboard.php?view=frnds&sort=points",
		"H" : "soundthehorn.php",
		"M" : "adversaries.php",
		"O" : "offers.php",
		"N" : "news.php",
		"B" : "boards.php",
		"D" : "donate.php"}


	if (String.toUpperCase(String.fromCharCode(e.keyCode)) in key_map 
		&& String.trim(e.target.className).length == 0 
		&& (typeof e.target.type == "undefined")
		&& (e.keyCode > 20 && e.keyCode < 112 )
		&& (e.ctrlKey==false && e.altKey==false))
		{
			window.location.replace("http://apps.facebook.com/mousehunt/" + 
  			key_map[String.toUpperCase(String.fromCharCode(e.keyCode))])
		}

}

window.addEventListener("keyup",function(event) { OnKeyUp(event); },false)