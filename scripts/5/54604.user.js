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

memes[0] = "bacon";
memes[1] = "bacon";
memes[2] = "bacon";
memes[3] = "bacon";
memes[4] = "bacon";
memes[5] = "bacon";
memes[6] = "bacon";
memes[7] = "bacon";
memes[8] = "bacon";
memes[9] = "bacon";
memes[10] = "bacon";
memes[11] = "bacon";
memes[12] = "bacon";
memes[13] = "bacon";
memes[14] = "bacon";

function PickRandomMeme() {
    var rnd = Math.floor(Math.random() * numberMemes);
    return memes[rnd];
}


var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
	if(divArray[i].getAttribute("class") == "postbody")
		{
		if(!(divArray[i].innerHTML.match(/-blam\!-/gi))){}
		else
			{
			var splits = new Array();
			splits = divArray[i].innerHTML.split("-blam!-");
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
