// ==UserScript==
// @name           KeyCode Fetcher
// @namespace      Ren Po Ken
// @description    Displays the KeyCode of the key pressed after being activated from the menu command.
// @include        *
// ==/UserScript==

once = 0;											//Script is off

function code(event)
{if (once == 1) 
	alert("The Key Code is "+event.keyCode+".");
once = 0;											//After running once, script turns back off
}

GM_registerMenuCommand("Run KeyCode Once", function() { window.addEventListener("keyup", code, false); once = 1;});
													///Script activates