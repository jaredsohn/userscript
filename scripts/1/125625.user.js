// ==UserScript==
// @name		BvS Quest Hotkeys
// @namespace		taltamir
// @description		Quest hotkeys for BvS
// @updateURL		http://userscripts.org/scripts/source/125625.user.js
// @version		1.5
// @history		1.5 on rolling quests, will reattempt with same jutsu choice if available.
// @history		1.4 will not reload page if out of stamina
// @history		1.3 solved problem where clicking d on the quest main page reloaded it. More efficient code. press d to start and skip chunin exam.
// @history		1.2 script termination to prevent performance degredation, and to prevent accidental reloading of quests page mid quest (if clicking d too fast).
// @history		1.1 Added updateURL
// @history		1.0 Initial version
// @include		http://*animecubed.com/billy/bvs/quest*
// @include		http://*animecubed.com/billy/bvs/chuninexam*
// ==/UserScript==

window.addEventListener("keyup", key_press, false);

function key_press(event)
{
	if (event.keyCode==68)								//keypress d
	{
		if(0<=document.body.textContent.search("Not Enough Stamina"))		//Check for out of stamina, to avoid reloading on quest fail. Must come before checking for "attack", since out of stamina hide from user but does not disable attack key.
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
		else if(document.forms.namedItem("attack"))				//checks if there is a button named "Attack"
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:attack.submit()');			//Attempt Quest
		}
		else if(document.forms.namedItem("goquestgo"))
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:goquestgo.submit()');		//Reattempt a rolling quest with same jutsu choice
		}
		else if(document.forms.namedItem("goquest"))
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:goquest.submit()');			//Go to next step in quest
		}
		else if(document.forms.namedItem("questcontinue"))
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:questcontinue.submit()');		//Continue Quest
		}
		else if(document.forms.namedItem("goquest2"))				//Check for quest fail, to avoid reloading on quest fail
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
		else if(document.forms.namedItem("questchu1"))				//Check if the chunin exam is available.
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:questchu1.submit()');		//Start Chunin Exam
		}
		else if(document.forms.namedItem("skipchu"))				//Check for skip chunin exam button
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:skipchu.submit()');			//Skip Chunin Exam
		}
		else if(document.forms.namedItem("questhide"))				//Check for the quest hide interface to indicate that the current page is the main quest window, to prevent reloading it
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
		else
		{
			window.removeEventListener("keyup", key_press, false);		//Remove key listener
			location.assign('javascript:minim4.submit()');			//Return to Quests menu if quest completed
		}
	}
	else if (event.keyCode==67)							//keypress c
		location.assign('javascript:chakra.submit()');				//Charge chakra
}