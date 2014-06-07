// ==UserScript==
// @name		BvS Mission Hotkeys
// @namespace		taltamir
// @description		Mission hotkeys for BvS
// @updateURL		http://userscripts.org/scripts/source/125638.user.js
// @version		1.3
// @history		1.3 e is disabled if smoke bomb count is zero. Better code.
// @history		1.2 e is disabled if an ally may level in mission. script terminates after execution to plug memory hole and prevent slowdowns. This also prevent "playing too fast" error and the crashing of mission tweak script.
// @history		1.1 Pressing e now also gets you a new mission.
// @history		1.0 Initial version
// @include		http://*animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==

window.addEventListener("keyup", key_press, false);				//When a key is released, run function key_press and provide it with keyID.

function key_press(event)
{
	if (event.keyCode==68)							//keypress d
	{
		if(document.forms.namedItem("attempt"))				//Check if there is an attempt mission button
		{
			window.removeEventListener("keyup", key_press, false);	//Remove keypress listener
			location.assign('javascript:attempt.submit()');		//Attempt mission
		}
		if(document.forms.namedItem("domission"))			//Check if there is a new mission button
		{
			window.removeEventListener("keyup", key_press, false);	//Remove keypress listener
			location.assign('javascript:domission.submit()');	//New mission
		}
	}
	if (event.keyCode==69)							//keypress e
	{
		if(document.body.textContent.search("One of your Allies has potential to level here!")>=0);	//Checks if an ally may level, if yes do nothing.
		else if(document.body.textContent.search("Item taken: Smoke Bombs - 0 remain")>=0);		//Checks if smokebomb count is zero, if yes do nothing.
		else if(document.forms.namedItem("attempt"))			//Check if there is an attempt mission button, but only if the above two ifs are false.
		{
			window.removeEventListener("keyup", key_press, false);	//Remove keypress listener
			jutsu374.setAttribute("checked", "checked");		//Check radio button for Escape Jutsu (jutsu374)
			location.assign('javascript:attempt.submit()');		//Attempt mission
		}
		if(document.forms.namedItem("domission"))			//Check if there is a new mission button
		{
			window.removeEventListener("keyup", key_press, false);	//Remove keypress listener
			location.assign('javascript:domission.submit()');	//New mission
		}
	}
	if (event.keyCode==67)							//keypress c
		location.assign('javascript:chakra.submit()');			//Charge chakra
}