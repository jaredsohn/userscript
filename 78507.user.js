// ==UserScript==
// @name           TheWestHideWorkbar
// @description		Hides the Premium Workbar and the Premium Workbutton
// @namespace      forestking
// @include http://*.the-west.*
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==


document.getElementById('workbar_right').style.display = "none";
document.getElementById('menu_work').style.display = "none";

