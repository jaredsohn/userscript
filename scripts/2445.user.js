// Dice-a-Rite!
// version 0.5 BETA!
// 2005-12-25
// Copyright (c) 2005, Tom Friday
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "Dice-a-Rite!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Dice-a-Rite!
// @namespace     http://actionhour.net
// @description   Plays dice-a-roo, stops at 1st silver dice roll. Beware the PANT DEVIL on the silver dice!
// @include       http://www.neopets.com/games/play_dicearoo.phtml
// @include       http://www.neopets.com/games/dicearoo.phtml

// ==/UserScript==




var allInput, thisInput, allImg, thisImg, Roll;
Roll = GM_getValue("RollHistory", "");
allInput = document.evaluate(
    '//input[@value]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allInput.snapshotLength; i++) {
    thisInput = allInput.snapshotItem(i);

    switch (thisInput.value) {
        case 'Roll Again':

		allImg = document.evaluate(
    		'//img[@src]',
    		document,
    		null,
    		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);
		for (var x = 0; x < allImg.snapshotLength; x++) {
    			thisImg = allImg.snapshotItem(x);

			if (thisImg.src.indexOf('dice/red') != -1) {
				GM_setValue("RollHistory", Roll + 'R');				
				document.title = 'Dice:' + Roll + 'R';
				thisInput.parentNode.submit();
			}
			if (thisImg.src.indexOf('dice/blue') != -1) {
				GM_setValue("RollHistory", Roll + 'B');				
				document.title = 'Dice:' + Roll + 'B';
				thisInput.parentNode.submit();
			}
			if (thisImg.src.indexOf('dice/green') != -1) {
				GM_setValue("RollHistory", Roll + 'G');				
				document.title = 'Dice:' + Roll + 'G';
				thisInput.parentNode.submit();
			}
			if (thisImg.src.indexOf('dice/yellow') != -1) {
				GM_setValue("RollHistory", Roll + 'Y');				
				document.title = 'Dice:' + Roll + 'Y';
				thisInput.parentNode.submit();
			}
			if (thisImg.src.indexOf('dice/silver') != -1) {
				GM_setValue("RollHistory", Roll + 'S');				
				document.title = 'Dice:' + Roll + 'S';
				break;
			}
// Aw, this way stops if at the 1st silver roll, which could be pant devil, right?
// Need to see src code for level up yellow dice page! 

		}
            break;

// 1st page
        case 'Play Dice-A-Roo':
		thisInput.parentNode.parentNode.submit();
            break;

// This is the jackpot!
        case 'Play Again!':
				GM_log(Roll + 'Jackpot!');				
				GM_setValue("RollHistory", "");				
            break;

// This is a losing game!
        case 'Press Me':
				GM_log(Roll + 'Lost');				
				GM_setValue("RollHistory", "");				

		thisInput.parentNode.parentNode.submit();
            break;

// Bypass the King Roo page
        case 'Lets Play! (Costs 5 NP)':
		//GM_log(thisInput.value);
		thisInput.parentNode.submit();
            break;
        default:
    }
								

}
