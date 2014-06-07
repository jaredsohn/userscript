// ==UserScript==
// @name           Pigskin Empire: Hide Affilate Tab
// @copyright      2011, GiantsFan23
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.29.11
// @description    Hides annoying affiliate tab on global menu.
// ==/UserScript==


var b = document.getElementsByClassName("dropdownmenu")[7];
	b.innerHTML = "";