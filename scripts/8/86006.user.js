// ==UserScript==
// @name          XP-inator
// @namespace     http://www.frieduck.com/sb/

// @include       http://*spybattle.com/profiles.php*

// @author        Theine
// @homepage      http://www.frieduck.com/sb/ 
// @version       0.2

// ==/UserScript==

// XP formula:
// 100 + 10 x network level + 4 x safe house (not counting the starting house)

var sh_names = ["Parent's Basement", "Spot Under Bridge", "Crickhouse Closet", 
	"Disused Public Restroom", "Shared Freight Container", "Coffin Hotel", 
	"Dirty Noodle House", "PermaDocked Fishing Boat", "Abandoned Communal Warehouse", 
	"Abandoned Subway Hideaway", "Brownstone", "Underground Bunker", "Bungalow", 
	"Detached House", "Penthouse", "Office Building", "Zeppelin", 
	"Abandoned Marine Lab", "Decommissioned Hospital", "Mountain Cave Complex", 
	"Secret Underground Lab", "Impressive Spy Tower", "Private Island", 
	"Exotic Volcanic Island", "Space Lab"];
	
var level = parseInt(document.getElementById('networkT').innerHTML);

var bioT = document.getElementById('bioT');
var bioTHTML = bioT.innerHTML;

var sh_result = bioTHTML.match(/Safe house\s+:\s+([^<]+)</);
if (sh_result != null) {
	sh_name = sh_result[1];
	var sh_level = -1;
	for ( var j = 0; j < sh_names.length; j++) {
		if(sh_names[j] == sh_name) {
			sh_level = j;
			break;
		}
	}
	var offline_xp = 100 + (10 * level) + (4 * sh_level);
	var online_xp = offline_xp + Math.floor(offline_xp / 10);
	bioTHTML = bioTHTML.replace("<br><br>","<br>");
	bioTHTML += '<br>XP (offline/online) : ' + offline_xp + ' / ' + online_xp;
	bioT.innerHTML = bioTHTML;
	
	// Extend paper background. Code courtesy of not V.
	var maindiv = document.getElementById('main');
	if (maindiv) {
		maindiv.style.height = '700px';
	}	
}
