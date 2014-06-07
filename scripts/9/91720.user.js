// ==UserScript==
// @name           Redlands-FuckFlash
// @namespace      MarkTraceur
// @description    Remove the useless flash intro on the University of Redlands website, replace it with something more interesting.
// @include        http://*.redlands.edu/*
// ==/UserScript==

// This script is released under the WTFPL, which is compatible with the GPL according to the FSF.
// It was originally authored by Mark Holmquist.

(

 function()
 {

     // *******************************************************************
     // Add a link to your target's profile on spy results pages.
     // *******************************************************************

     if ((window.location.host == "www.redlands.edu") && (window.location.pathname == "/")) {
	 flashshit = document.getElementById("section");
	 if (flashshit) {
	     flashshit.innerHTML = "<div align=\"center\"><img src=\"http://imgur.com/uiuwu.png\" /></div>"
	 }
     }

 }

 )();