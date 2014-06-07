
// Tuxmachines links fixer
// version 0.1 
// 2008-12-25
// Copyright (c) 2008, Santiago Suarez Ordoñez
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
// select "Tuxmachines links fixer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tuxmachines links fixer
// @description   Script to open "More Here" links from tux machines
// 		  posts in the same browser window
// @include       http://tuxmachines.org/node/*
// @include       http://www.tuxmachines.org/node/*
// ==/UserScript==
var divs = document.getElementsByTagName("div");
for (var i = 0; i <= divs.length-1; i++){
	if (divs[i].className == "node") {
		var lks = divs[i].getElementsByTagName("a");
		if (lks){
		for (var j = 0; j <= lks.length-1; j++){
			if (lks[j].target == "_blank") {
				lks[j].target = "_self";
			};
		};
		};
	};
}
