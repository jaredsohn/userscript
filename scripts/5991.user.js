//  Pet-Pet Battle Master! v 0.2
// version 0.2 BETA!
// 2006-9-25
// Copyright (c) 2006, John Merrik
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
// select "Pet-Pet Battle Master!", and click Uninstall.
//
// --------------------------------------------------------------------
//                         -=HISTORY=-
//  Version 0.1 - First Release... It will never be updated
//  Version 0.2 - Minor Bug fix.
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          Pet-Pet Battle Master!
// @namespace     http://www.neopets.com/
// @description   Plays PetPet Battle Indefinitely... It's pointless really...
// @include      http://www.neopets.com/games/petpet_battle/*
// ==/UserScript==

var allInput, thisInput, allImg, thisImg;
allInput = document.evaluate(
    '//input[@value]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allInput.snapshotLength; i++) {
    thisInput = allInput.snapshotItem(i);

    switch (thisInput.value) {

// 1st page
        case 'Head Shot':
		thisInput.click();
            break;

        case 'New Game':
		thisInput.click();
            break;
        default:
    }
								

}

