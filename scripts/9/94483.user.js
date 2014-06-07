// =======[ GTAForums Sidebar Remover v1.1 ]===============
// Created by Edmachine
// This script can disable the sidebar permanently-ish.
// I've seen some forumers complain about it, so why not
// make a script for it? Firefox only, though, it seems. :(
// All you have to do is set the SIDEBAR variable to 0, 
// the SKIN variable to the skin you use (see Skin Support
// section) and there you go. Massive thanks to Dustin Diaz
// for his getElementsByClass function! :)
// The script is set to disable the sidebar by default,
// and the skin is set to the default skin. 
// =======[ SKIN SUPPORT ]=================================
// 1. AfterFuture - Yes
// 2. Conventional AfterFuture - Yes
// 3. Conventional - Yes
// 4. Conventional GTANET - Yes
// 5. Conventional Militant - Yes
// 6. GTA3.com - Yes
// 7. GTALibertyCityStories.net - Yes
// 8. GTANET 2k4 - Yes
// 9. GTANET 2k4 lite - Yes
// 10. GTANET 2k4 Xmas - Yes
// 11. GTANET 2k4+ (default skin) - Yes
// 12. GTASanAndreas.net - Yes
// 13. GTAVice.com - Yes
// 14. Hashcake - Yes
// 15. Invision Power Board - N/A
// 16. South Side Hoodz - Yes
// 17. The Connection - Yes
//
// =======[ CHANGELOG ]====================================
// -------[ 1.1 ]------------------------------------------
// 1. Added support for GTANET 2k4+ skin.
//
// ==UserScript==
// @name           GTAForums Sidebar Remover
// @namespace      Edmachine
// @include        http://www.gtaforums.com/
// @include        http://www.gtaforums.com/*
// ==/UserScript==

// Set to 0 to disable the sidebar, 1 to enable it.
// Enter 1-17 depending on your skin

var SIDEBAR = 0;
var SKIN = 11;

// DO NOT CHANGE BEYOND THIS POINT

// Thanks to Dustin Diaz for the function!
// http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var menu = document.getElementById("menu");
var menu_td = document.body.getElementsByTagName("td");
var menu_div = document.body.getElementsByTagName("div");
var menu_lcs = document.getElementById("menu_area");
var menu_conv = getElementsByClass("navigation bg1");

if(SIDEBAR == 0) {
	if(SKIN == 1 || SKIN == 8 || SKIN == 9 || SKIN == 10 || SKIN == 11 || SKIN == 13) {
		menu.style.display = "none";
	}
	if(SKIN == 2 || SKIN == 3 || SKIN == 4 || SKIN == 5) {
		menu_conv[0].style.display = "none";
		menu_div[0].style.width = "98.5%";
	}
	if(SKIN == 6) {
		menu_td[0].style.display = "none";
		menu_td[4].style.display = "none";
	}
	if(SKIN == 7) {
		menu_td[0].style.display = "none";
		menu_lcs.style.display = "none";
	}
	if(SKIN == 12) {
		menu_td[0].style.display = "none";
	}
	if(SKIN == 14) {
		menu_td[7].style.display = "none";
		menu_td[12].style.display = "none";
	}
	if(SKIN == 15) {
		menu_td[3].style.display = "none";
	}
	if(SKIN == 17) {
		menu_td[0].style.display = "none";
		menu_td[2].style.display = "none";
	}
}