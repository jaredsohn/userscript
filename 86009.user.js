// ==UserScript==
// @name          R&D-inator
// @namespace     http://www.frieduck.com/sb/

// @include       http://*spybattle.com/profiles.php*

// @author        Theine
// @homepage      http://www.frieduck.com/sb/ 
// @version       0.2

// ==/UserScript==

// R&D formula:
// network level + 20 x safe house (indexed from 1)
// apt_ful_min = (apt_ene_total * apt_res_total)/2000;
// apt_ful_max = (apt_ene_total * apt_res_total)/900;

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
			sh_level = j+1;
			break;
		}
	}
	var base_rd = level + (20 * sh_level);
	var base_energy = level + 9;

	bioTHTML = bioTHTML.replace("<br><br>","<br>");
	bioTHTML += '<br>R&D (base/SHv1/SHv2) : ' 
		+ '<span style="{text-decoration: underline}" title="Min: ' + ppfloat((base_energy * base_rd)/2000) + ' / Max: ' + ppfloat((base_energy * base_rd)/900) + '">' + base_rd + '</span>'
		+ '/' 
		+ '<span style="{text-decoration: underline}" title="Min: ' + ppfloat(((base_energy + 1)* (base_rd + 10))/2000) + ' / Max: ' + ppfloat(((base_energy + 1) * (base_rd + 10))/900) + '">' + (base_rd+10) + '</span>'
		+ '/' 
		+ '<span style="{text-decoration: underline}" title="Min: ' + ppfloat(((base_energy + 2)* (base_rd + 20))/2000) + ' / Max: ' + ppfloat(((base_energy + 2) * (base_rd + 20))/900) + '">' + (base_rd+20) + '</span>';
	bioT.innerHTML = bioTHTML;
	
	// Extend paper background. Code courtesy of not V.
	var maindiv = document.getElementById('main');
	if (maindiv) {
		maindiv.style.height = '700px';
	}
}

function ppfloat(num) {
	return "" + Math.round(100*num)/100;
}
