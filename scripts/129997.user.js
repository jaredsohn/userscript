// ==UserScript==
// @name           glb_anti_spoiler
// @namespace      GLB
// @include        http://goallineblitz.com/game/replay.pl?*
// @include        http://glb.warriorgeneral.com/game/replay.pl?*
// ==/UserScript==

window.setTimeout( function()
	{
		control_buttons = document.getElementById("controls").getElementsByClassName("button left");
		last_button = control_buttons[control_buttons.length-1];	
		
		if(!(last_button.firstChild.innerHTML == "Next Pos &gt;&gt;")) {
			if(!(last_button.firstChild.innerHTML == "Next Play &gt;" )) {
				new_button = document.createElement('a');
				new_button.className = "button left";
				new_button.innerHTML = "<span>Next Play &gt;</span>";
				document.getElementById("controls").insertBefore(new_button, last_button.nextSibling);
				last_button = new_button;
			}	
			
			new_button = document.createElement('a');
			new_button.className = "button left";
			new_button.innerHTML = "<span>Next Pos &gt;&gt;</span>";
			document.getElementById("controls").insertBefore(new_button, last_button.nextSibling);
		}		
	}
)
