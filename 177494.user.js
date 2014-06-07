// ==UserScript==
// @name		Outlook.com PrintMod
// @version		0.1
// @author		unrealmirakulix
// @description	hint how to print on Outlook.com
// @icon 		https://a.gfx.ms/OLFav.ico
// @include 	http*://dub112.mail.live.com/*
// @copyright   none
// @updateURL 	
// @downloadURL 
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete' || document.readyState == 'interactive') {

	// Hotkeys (on all pages) [done by listening to keyboard input]
	document.onkeydown = function(e) {
	
		e = e || window.event;

		// if CTRL from detection
		if (e.ctrlKey && e.keyCode == 80) {
			e.preventDefault();
			
			// press shift+p alert
			alert("Sie wollten doch eigentlich Shift + p drücken, um dann auch die Druckvorschau zu erhalten.");
			
		}	
	};
};