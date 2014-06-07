// ==UserScript==
// @name OGame Redesign : Interface Cleaner
// @namespace http://userscripts.org/scripts/show/59576
// @description OGame Redesign : Cleans the user interface of less useful elements
// @date 2009-10-13
// @creator mkey
// @include http://uni42.ogame.org/game/index.php?page=*
// @exclude
// ==/UserScript==

(function(){
	var main;
	var division;
	var menu;
	var buttons;
	
	main = document.getElementById("info");
	if (!main) return;
	
	// remove the officers icons, who the hell needs them anyway
	division = document.getElementById("officers");
	if (!division) return;
	main.removeChild(division);
	
	// remove the officers button, if they need us they know where to find us
	menu = document.getElementById("menuTable");
	if (!menu) return;
	buttons = menu.getElementsByTagName("li");
	if (!buttons) return;
	
	for (var i=0; i<buttons.length; i++){
		division = buttons[i].getElementsByTagName("span");
		for (var j=0; j<division.length; j++){
			if (division[j].textContent == "Recruit Officers"){
				menu.removeChild(buttons[i]);
				break;
			}
		}
	}
	
	// remove the pointy ultra green patch link
	division = document.getElementById("clearAdvice");
	if (!division) return;
	main.removeChild(division);
	division = document.getElementById("changelog_link");
	if (!division) return;
	main.removeChild(division);
	
	// remove the tutorial link
	division = document.getElementById("helper");
	if (!division) return;
	main.removeChild(division);
})()
