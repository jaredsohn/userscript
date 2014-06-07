// Neopet PetPet Battle Master v 0.5
// was: Pet-Pet Battle Master! v 0.2
// BETA Version. You are warned.
// 2007-05-18
// Copyright (c) 2006, John Merrik
// Released under the GPL license
// ....and slightly modified by tcd
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
// select "PetPet Battle Master v 0.4", and click Uninstall.
//
// --------------------------------------------------------------------
//                         -=HISTORY=-
//  Version 0.1 - First Release... It will never be updated
//  Version 0.2 - Minor Bug fix.
//  Version 0.3 - (tcd:) Added Body Blow.
//	 Version 0.4 - Hopefully found a way to end the endless battling
//  Version 0.5 - thanks to alien_scum, code's much smaller & nicer.
//---------------------------------------------------------------------
//                          -=TO DO=-
// find a way to make this script more useful: as it is now, it doesn't
// really help you to raise petpet's level :p
//---------------------------------------------------------------------
// ==UserScript==
// @name          PetPet Battle Master v 0.5
// @namespace     neopets.com
// @description   Plays PetPet Battle in your place
// @include      http://www.neopets.com/games/petpet_battle/*
// ==/UserScript==

if (document.body.innerHTML.indexOf("You have played more then 30 games today.") != -1)
	{alert("Eh! Give your petpet some rest, will you?")}

var thisInput, thisNumber, thisButton;

thisNumber = Math.random();
if (thisNumber == 0) {thisButton = 'Head Shot'} else {thisButton = 'Body Blow'}
if (document.body.innerHTML.indexOf("Click to play a new game.") !=-1)	{thisButton = 'New Game'}

thisInput = document.evaluate('//input[@value="'+thisButton+'"]',document,null,null,null).iterateNext();
if (thisInput && document.body.innerHTML.indexOf("You have played more then 30 games today.") ==-1)
   {thisInput.click();}