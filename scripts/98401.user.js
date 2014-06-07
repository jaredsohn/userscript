// ==UserScript==
// @name           Combat Tournament Auto-Raid
// @namespace      pardus.at
// @description    Automatically checks surrender on PvP combat screens
// @include        http://*.pardus.at/ship2ship_combat.php?*
// @author         rhindon
// @version        1.1
// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var checkSurrender = true;		//Set to true to check the "Only fight until the enemy surrenders (raid)" checkbox; false otherwise;

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

if(checkSurrender && document.URL.indexOf('ship2ship_combat.php') >= 0) {

	document.getElementById('letsurrender').checked = true;

}