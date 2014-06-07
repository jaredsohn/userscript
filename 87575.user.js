// ==UserScript==
// @name          NG Auto-Happy
// @namespace     http://www.newgrounds.com/
// @description   Changes your topic and post icon to always use the smiley with id w/e(default: 1).
// @include       http://www.newgrounds.com/*
// ==/UserScript==

var sid = 1; //default 1 for the 1 face. Change this number to which smiley you want.

function MakeSmileySelection ( id )
{
	var hidden_icon_element = document.getElementById("icon");

	// First see if there's an old one to deactivate
	var old_id = hidden_icon_element.value;
	if(old_id != "")
	{
		document.getElementById("smiley" + old_id).className = "smiley_off";
	}

	// Now activate the new one
	document.getElementById("smiley" + id).className = "smiley_on";
	hidden_icon_element.value = id;
}

MakeSmileySelection(sid);