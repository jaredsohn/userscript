// ==UserScript==
// @name		BvS Wheel Hotkeys
// @namespace		taltamir
// @description		Wheel hotkeys for BvS
// @updateURL		http://userscripts.org/scripts/source/125642.user.js
// @version		1.1
// @history		1.1 Remove key listener to ensure only 1 click per page load. Faster, no memory leak, and no "playing too fast" error.
// @history		1.0 Initial version
// @include		http://*animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

window.addEventListener("keyup", key_press, false);				//When a key is released, run function key_press and provide it with keyID.

function key_press(event)
{
	if (event.keyCode==68)							//keypress d
	{
		window.removeEventListener("keyup", key_press, false);		//Remove key listener
		location.assign('javascript:raf.submit()');			//Spin the Wheel
	}
}