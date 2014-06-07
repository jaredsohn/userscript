// ==UserScript==
// @name           Vampires Auto Attacker
// @namespace      http://greasemonkeyscripts.blogspot.com
// @include        http://apps.facebook.com/vampires/fighting-confirm.php?ref=f_mainpic&defender_fbuserid=*
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Vampire Auto Attacker", and click Uninstall.
//
// --------------------------------------------------------------------


///////////////////////////////////////////////////////////////////
/////////////////	About the script	///////////////////////////////
///////////////////////////////////////////////////////////////////
//This script automates the attacking function in Vampires.
//It will use the maximum turns possible to attack the chosen target.
//
//
// To use:
// At the "Pick a fight!" page, click on the link of the target you want to attack.
// The script will then choose the maximum turns to use to attack, and click on "Attack Now!"
// To rerun the script, simply press the back button on the browser's Navigation bar.
//
//
// @author The Greasy Monkey				greasemonkeyscripts.blogspot.com
//
///////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////
/////////////////	Start of Codes	///////////////////////////
///////////////////////////////////////////////////////////////////

// Flag to denote if an action has been performed.
var action = false;

// Select the highest option for number of attacks.
var divs = document.evaluate(
		"//div/select[contains(@name, 'num_attacks')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (divs.snapshotLength > 0) {
	var num_attack = divs.snapshotItem(0);
	num_attack.selectedIndex = num_attack.length - 1;
}

// Click "Explore" button
var inputButtons = document.evaluate(
			"//input[contains(@value,'Attack Now!')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (inputButtons.snapshotLength > 0) {
	var inputButton = inputButtons.snapshotItem(0);
	//	alert ('Clicking: ' + inputButton.id);
	inputButton.click();
	action = true;
	
}

// Check if any action was performed.  
//  If no action, raise an alert to show code has been broken.
if (!action) {
	alert('No action taken!');
}

//  Confirm URL
//http://apps.facebook.com/vampires/fighting-confirm.php?ref=f_mainpic&defender_fbuserid=841515491&defender_monster_type_id=29

//	Result URL
//http://apps.facebook.com/vampires/fighting-result.php?d=841515491&ap=5&dp=2&n=3&w=604196905&t=29
