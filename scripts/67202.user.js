// ==UserScript==
// @name           Pardus Drunk Combat Mode
// @namespace      pardus.at
// @description    Prevents drunk pilots from clicking on dangerous NPCs (maybe)
// @include        http://*.pardus.at/main.php*
// @version        0.2
// @author         John Wu
// ==/UserScript==

// Below is the list of NPCs which you won't be able to click on in Drunk mode. 
// The values should be the names of the NPC images separated by |

var unsafe = "z16_fighter|medusa|medusa_swarmlings|space_worm|space_snail|frost_crystal|space_crystal|space_dragon_queen|space_snail";
unsafe += "preywinder|glowprawn|x993_squad";

function drunkPilot() {
document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	element = event.target;
	src = element.getAttribute('src');
	if (src) {
		var x = src.match(unsafe);
		if (x) {
		event.stopPropagation();
		event.preventDefault();
		alert('You are too drunk to fight a ' + x + '!');
		}
	}

}, true);
}

function sober() {
GM_setValue('is_drunk','no');
var btnSober = document.getElementById("btnSober");
btnSober.disabled = "true";
btnSober.className = "disabled";
}

function drunk () {
GM_setValue('is_drunk','yes');
var btnDrunk = document.getElementById("btnDrunk");
btnDrunk.disabled = "true";
btnDrunk.className = "disabled";
}
// is the GM_Value set?
if (!GM_getValue('is_drunk')) {
    GM_setValue('is_drunk','no');
    } else {

var div = document.createElement("div");
div.align = "center";
// create 'drunk' button
var btnDrunk = document.createElement("input");
btnDrunk.id = "btnDrunk";
btnDrunk.type = "submit";
btnDrunk.value = "Drunk Mode";
if (GM_getValue('is_drunk')=='yes') {
  btnDrunk.disabled = "true";
  btnDrunk.className = "disabled";
  }
btnDrunk.addEventListener("click", drunk, false);
div.appendChild(btnDrunk);
// create 'sober' button
var btnSober = document.createElement("input");
btnSober.id = "btnSober";
btnSober.type = "submit";
btnSober.value = "Sober Mode";
if (GM_getValue('is_drunk')=='no') {
  btnSober.disabled = "true";
  btnSober.className = "disabled";
  }
btnSober.addEventListener("click", sober, false);
div.appendChild(btnSober);
// insert div below Cargo window
var name = document.getElementById('cargo');
name.appendChild(div);

if (GM_getValue('is_drunk')=='yes') {
  drunkPilot();
  } 


} // ^else