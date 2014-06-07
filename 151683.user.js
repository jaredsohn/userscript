// ==UserScript==
// @name        Starfail
// @namespace   JasonMelancon
// @description Hide distracting links at starfall.com
// @include     http://www.starfall.com/*
// @include     http://more2.starfall.com/*
// @require	http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @version     2
// ==/UserScript==

// *** CLASSROOM PERSONNEL: SEE BELOW TO CHANGE THE HOTKEY KEY COMBINATION!

// Since GM prefs set by GM_setValue() are specified with string names, and 
// it's easy to mistype strings, creating a pseudo-constant prevents me from
// accidentally adding or checking bogus preferences.
var HIDETABLES = "hide_tables"; 

// disable the teaser pages which try to get you to send money
// if (document.URL.indexOf("more2")>=0 && GM_getValue(HIDETABLES)==true) 
// 	history.back();
// (this section commented out because the teaser pages are actually used)

function HideDistractions()
{	var t=document.getElementsByTagName("table");
	for (i=0;i<t.length;i++)
	{	t[i].style.display = "none";
	}
	var ps=document.getElementsByTagName("p");
	for (i=0;i<ps.length;i++)
	{	ps[i].style.display = "none";
	}
}

function ShowDistractions()
{	var t=document.getElementsByTagName("table");
	for (i=0;i<t.length;i++)
	{	t[i].style.display = "table";
	}
	var ps=document.getElementsByTagName("p");
	for (i=0;i<ps.length;i++)
	{	ps[i].style.display = "block";
	}
}

function ChangeThePage()
{	if (GM_getValue(HIDETABLES)==true && document.URL.indexOf("/n/")>=0) 
	{	HideDistractions() 
	}
	else
	{	ShowDistractions();
	}
}

// If we don't see the HideTables setting in the settings for this script, 
// that means this is the first time it's run on this installation of Firefox
// in this OS account. In that case, we create the setting.
if (GM_listValues().indexOf(HIDETABLES)==-1) // if the setting isn't found
{	GM_setValue(HIDETABLES, false);
}

// When the script loads, it will change the page according to 
// the existing setting. 
ChangeThePage();

// This is where I use the shortcut library (specified with the @require above) 
// The following documentation is from the library site at 
// http://www.openjs.com/scripts/events/keyboard_shortcuts/ 
//
// *** BEGIN INSTRUCTIONS FOR CLASSROOM PERSONNEL (see below)
// //
// // The shortcut keys should be specified in this format ...
// // Modifier[+Modifier..]+Key
// // 
// // Example...
// // Ctrl+A
// // 
// // The valid modifiers are
// // 
// //   * Ctrl
// //   * Alt
// //   * Shift
// //   * Meta (Macintosh only)
// // 
// // The valid Keys are...
// // 
// //   * All alpha/numeric keys - abc...xyz,01..89
// //   * Special Characters - Every special character on a standard keyboard can be accessed.
// //   * Special Keys...
// //       * Tab
// //       * Space
// //       * Return
// //       * Enter
// //       * Backspace
// //       * Scroll_lock
// //       * Caps_lock
// //       * Num_lock
// //       * Pause
// //       * Insert
// //       * Home
// //       * Delete
// //       * End
// //       * Page_up
// //       * Page_down
// //       * Left
// //       * Up
// //       * Right
// //       * Down
// //       * F1
// //       * F2
// //       * F3
// //       * F4
// //       * F5
// //       * F6
// //       * F7
// //       * F8
// //       * F9
// //       * F10
// //       * F11
// //       * F12
// // 
// // These keys are case insensitive - so don't worry about using the correct case.

// *** NOTE: FOR CLASSROOM PERSONNEL 
// *** IF A STUDENT LEARNS THE KEYBOARD SHORTCUT, YOU CAN CHANGE IT! 
// *** TO DO SO, FEEL FREE TO CHANGE THE STUFF IN QUOTES ON THE NEXT LINE USING THE ABOVE INSTRUCTIONS 
shortcut.add("shift+alt+Q",   // the hotkey as originally programmed was shift+alt+Q,
	function()            // which can be done discreetly with the left hand
	{	GM_setValue(HIDETABLES, !GM_getValue(HIDETABLES)); // change the setting
		ChangeThePage();
	}
);
