// Custom -blam!-s
// created by CAVX
// 2008-08-29
// Copyright (c) 2005
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Custom -blam!-s", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Custom -blam!-s
// @namespace     Custom -blam!-s
// @description   Duardo was tired of -blam!-.
// @include       http://*bungie.net/*
// ==/UserScript==

var numberMemes = 15;
var memes = new Array(numberMemes);

memes[0] = "blame stosh";
memes[1] = "Foman's Mom";
memes[2] = "PM Duardo";
memes[3] = "THIS SOFFISH DO NOT EAT";
memes[4] = "skiska, u got it good";
memes[5] = "i am not good with computer";
memes[6] = "blarg";
memes[7] = "Frogblast the Ventcore";
memes[8] = "SE7EN IS DARKER";
memes[9] = "can i has recon";
memes[10] = "WAT DA HEK BUNGIE";
memes[11] = "KEEP IT CLEAN";
memes[12] = "BE A HERO! REPORT VIOLATORS";
memes[13] = "PARDON OUR DUST";
memes[14] = "inb4lock";

function PickRandomMeme() {
    var rnd = Math.floor(Math.random() * numberMemes);
    return memes[rnd];
}


var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
	if(divArray[i].getAttribute("class") == "postbody")
		{
		if(!(divArray[i].innerHTML.match(/but bungie.net won't accept the characters/gi))){}
		else
			{
			var splits = new Array();
			splits = divArray[i].innerHTML.split("but bungie.net won't accept the characters");
			var newstr = "";
			for (var j = 0; j<splits.length; j++)
				{
				if(j > 0)
					{
					newstr = newstr+"-"+PickRandomMeme()+"!-";
					}
				newstr = newstr+splits[j];
				}
			divArray[i].innerHTML = newstr;
			}
		}
	}
