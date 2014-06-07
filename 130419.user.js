// ==UserScript==
//
// Torn Easter Egg Finder version 0.2
//
// Features
// -------------------------------------------------------------------------
// - Warns you if any Easter Egg is present on the current page
// - Possibility to auto recover the egg - set by user script commands(auto/manual)
//
// What Does It Do?
// -------------------------------------------------------------------------
// Looks for eggs on every visited page
// Recovers the egg automatically (if set by user)
// or
// just warns user about the presence of an easter egg on the present page ((default setting)
//
// -------------------------------------------------------------------------
//
// Don't blame me if you missed an egg because of the script
// 
// -------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, 
// you need Greasemonkey 0.6.6 or later: http://greasemonkey.mozdev.org/
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts,
// select this script, and click Uninstall.
//
// @name          Easter Egg Hunting
// @version       0.2
// @namespace     http://userscripts.org/users/314022
// @description   Automatic discovery of eggs in TornCity
// @include       http://*.torn.com/*
// @include       http://users.telenet.be/* --- For testing and debugging
// @exclude       http://*.torn.com/competitioneaster.php?step=eggfind*
//
// ==/UserScript==

var aGreaseMenuItemText = [
/*   0*/	"Set automatic egg recovery", 
/*   1*/	"Enter 1 to enable auto recovery, 0 to disable.\n\nWhen enabled, this script automatically recovers the egg.\nElse you need to click the egg yourself to recover it.\n\n",
];

var arrAll=document.getElementsByTagName("a");

setupGreaseMonkeyMenu();

for(i=0; i<arrAll.length; i++) {
	var target=arrAll[i].href;
	if(target.indexOf('eggfind')>=0) {
		if (GM_getValue("automate", 0) == 1) {
			window.location=target;
		} else {
			alert ("Woot !!!\nEgg found on this page\nNow click the egg to claim it");
		}
	}
}

// setting greasemonkey menus for user input...
function setupGreaseMonkeyMenu() {
	GM_registerMenuCommand(aGreaseMenuItemText[0], promptAutomaticEggRecovery); // get auto collect eggs enable disable from user by greasemonkey menu
}

// greasemonkey menu item functions ...
function promptAutomaticEggRecovery() {
	var curentSetup = GM_getValue ( "automate" , 0 );
	var newSetup = prompt(aGreaseMenuItemText[1],curentSetup);
	if ( newSetup != null )
		GM_setValue ( "automate", newSetup.replace(/\s/g,"") );
}