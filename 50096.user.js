// ==UserScript==
// @name           Pardus Missile Defaults
// @namespace      pardus.at
// @description    Automatically checks all missiles on load of Ship-to-Ship or Ship-to-NPC combat screens
// @include        http://*.pardus.at/ship2ship_combat.php?*
// @include        http://*.pardus.at/ship2opponent_combat.php?*
// @author         rhindon
// @version        1.1
// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var checkOnPvP = true;			//Set to true to check all missiles when doing Player-vs-Player Combat; false otherwise.
var checkOnPvNPC = true;		//Set to true to check all missiles when doing Player-vs-NPC Combat; false otherwise.
var checkSurrender = false;		//Set to true to check the "Only fight until the enemy surrenders (raid)" checkbox; false otherwise;


// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

function gmCheckAllMissiles() {
	if(document.getElementById("allmissiles")) {
	    document.getElementById('allmissiles').checked = true;
    }
    
    unsafeWindow.checkAllMissiles();
}



if(checkOnPvP && document.URL.indexOf('ship2ship_combat.php') >= 0) {

	gmCheckAllMissiles();

}

if(checkOnPvNPC && document.URL.indexOf('ship2opponent_combat.php') >= 0) {
	gmCheckAllMissiles();

}

if(checkSurrender && document.URL.indexOf('ship2ship_combat.php') >= 0) {

	document.getElementById('letsurrender').checked = true;

}

